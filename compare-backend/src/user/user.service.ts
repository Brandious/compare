import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InitService } from 'src/init/init.service';
import { Coverage } from 'src/init/model/coverages.schema';
import { Discounts } from 'src/init/model/discounts.schema';
import { CreateUserInput } from './model/user.input';
import { UserPayload } from './model/user.payload';
import { User } from './model/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(InitService) private readonly initService: InitService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createUser(body: CreateUserInput): Promise<UserPayload> {
    const createdUser = new this.userModel(body);

    // // Calculate the base price based on the city and age
    createdUser.basePrice = await this.calculateBasePrice(
      createdUser.city,
      createdUser.birthDate,
      body.voucher,
    );

    createdUser.coverages = [] as Coverage[];
    createdUser.discounts = [] as Discounts[];

    createdUser.calculatedDiscounts = 0;

    if (body.vehiclePower > 100) {
      const discount = await this.initService.findDiscountByName(
        'Strong car surcharge',
      );
      createdUser.discounts.push(discount);

      createdUser.calculatedDiscounts = this.calculateDiscounts(
        createdUser,
        discount,
      );
    }

    createdUser.finalPrice =
      createdUser.basePrice - createdUser.calculatedDiscounts;

    const user = await createdUser.save();
    return user as UserPayload;
  }

  calculateCoverages(user: UserPayload, coverage: Coverage): number {
    const { calculatedDiscounts } = user;

    let totalDiscount = calculatedDiscounts;

    switch (coverage.name) {
      case 'Bonus Protection':
        totalDiscount += user.basePrice * 0.12;
        break;
      case 'AO+':
        totalDiscount +=
          this.calculateAge(user.birthDate) > coverage.age
            ? coverage.maxPrice
            : coverage.minPrice;
        break;
      case 'Glass protection':
        totalDiscount += user.vehiclePower * 0.2;
        break;
      default:
        break;
    }

    return totalDiscount;
  }

  calculateDiscounts(user: UserPayload, discount: Discounts): number {
    // Add your logic to calculate the discounts based on the coverages and discounts
    const { calculatedDiscounts } = user;

    let totalDiscount = calculatedDiscounts;

    switch (discount.name) {
      case 'Commercial discount':
        totalDiscount += user.basePrice * 0.1;
        break;
      case 'Adviser discount':
        if (user.coverages.length >= discount.numberOfCovrages) {
          totalDiscount += user.basePrice * 0.2;
        } else throw new Error('Number of coverages is less than required');
        break;
      case 'VIP discount':
        if (user.vehiclePower > discount.vehiclePower) {
          totalDiscount += user.basePrice * 0.05;
        } else throw new Error('Vehicle power is less than required');
        break;
      case 'Strong car surcharge':
        if (user.vehiclePower > discount.vehiclePower) {
          totalDiscount += user.basePrice * 0.1;
        } else throw new Error('Vehicle power is less than required');
        break;
      default:
        break;
    }

    return totalDiscount;
  }

  async addCoverages(id: string, coverage: string): Promise<UserPayload> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with email id:${id} not found `);
    }

    const coverageById = await this.initService.findCoverageById(coverage);

    if (!coverageById) {
      throw new NotFoundException(`Coverage with name:${coverage} not found`);
    }

    if (user.coverages.some((el) => el.name === coverageById.name)) {
      user.coverages = user.coverages.filter(
        (cov) => cov.name !== coverageById.name,
      );

      user.calculatedDiscounts = 0;
      user.calculatedDiscounts = user.coverages.reduce(
        (a, el) => a + this.calculateCoverages(user, el),
        0,
      );
      user.finalPrice = user.basePrice + user.calculatedDiscounts;

      if (
        user.coverages.length < 2 &&
        user.discounts.some((el) => el.name === 'Adviser discount')
      ) {
        user.discounts = user.discounts.filter(
          (dis) => dis.name !== 'Adviser discount',
        );
        user.calculatedDiscounts = 0;
        user.calculatedDiscounts = user.discounts.reduce(
          (a, el) => a + this.calculateDiscounts(user, el),
          0,
        );

        user.finalPrice = user.basePrice + user.calculatedDiscounts;
      }

      return await user.save();
    }

    user.coverages.push(coverageById);
    if (user.coverages.length >= 2) {
      const discount =
        await this.initService.findDiscountByName('Adviser discount');
      user.discounts.push(discount);
      user.calculatedDiscounts = this.calculateDiscounts(user, discount);
    }

    user.calculatedDiscounts += this.calculateCoverages(user, coverageById);
    user.finalPrice = user.basePrice - user.calculatedDiscounts;
    return await user.save();
  }

  async addDiscounts(id: string, discount: string): Promise<UserPayload> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with email id:${id} not found `);
    }

    const discountById = await this.initService.findDiscountById(discount);
    if (!discountById) {
      throw new NotFoundException(`Discount with name:${discount} not found`);
    }

    if (user.discounts.some((el) => el.name === discountById.name)) {
      user.discounts = user.discounts.filter(
        (dis) => dis.name !== discountById.name,
      );
      user.calculatedDiscounts = 0;
      user.calculatedDiscounts = user.discounts.reduce(
        (a, el) => a + this.calculateDiscounts(user, el),
        0,
      );
      user.finalPrice = user.basePrice + user.calculatedDiscounts;
      return await user.save();
    }

    user.discounts.push(discountById);

    user.calculatedDiscounts = this.calculateDiscounts(user, discountById);
    user.finalPrice = user.basePrice - user.calculatedDiscounts;
    return await user.save();
  }

  async getDiscounts(): Promise<Discounts[]> {
    return await this.initService.getAllDiscounts();
  }

  async getCoverages(): Promise<Coverage[]> {
    return await this.initService.getAllCoverages();
  }

  async findUser(id: string): Promise<UserPayload> {
    const user = await this.userModel.findOne({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException(`User with email id:${id} not found `);
    }
    return user as UserPayload;
  }

  async listUser(): Promise<UserPayload[]> {
    const users = await this.userModel.find();
    return users as UserPayload[];
  }

  async updateUser(id: string, body: CreateUserInput): Promise<UserPayload> {
    await this.userModel.updateOne({ _id: id }, body);
    const updatedUser = this.userModel.findById(id);
    return updatedUser as UserPayload;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }

  async calculateBasePrice(
    city: string,
    age: Date,
    voucher?: number,
  ): Promise<number> {
    // Add your logic to calculate the base price based on the city and age
    const years = this.calculateAge(age);
    const percentage = this.getPercentageBasedOnAge(years);
    const getCityById = await this.initService.findCityById(city);

    if (!getCityById) {
      throw new NotFoundException(`City with id:${city} not found`);
    }

    const voucherDiscount = voucher ? voucher : 0;

    return getCityById.basePrice * (1 + percentage) - voucherDiscount;
  }

  getPercentageBasedOnAge(age: number): number {
    if (age >= 18 && age <= 23) {
      return 0.05; // Smaller percentage for ages 18-23
    } else if (age >= 65) {
      return 0.05; // Smaller percentage for ages 65+
    } else {
      return 0.1; // Normal percentage for other ages
    }
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
