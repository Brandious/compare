import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from './model/city.schema';
import { Coverage } from './model/coverages.schema';
import { Discounts } from './model/discounts.schema';

@Injectable()
export class InitService {
  constructor(
    @InjectModel(City.name) private cityModel: Model<City>,
    @InjectModel(Coverage.name) private coverageModel: Model<Coverage>,
    @InjectModel(Discounts.name) private discountsModel: Model<Discounts>,
  ) {}

  async migrateCities(): Promise<void> {
    const cities = [
      { name: 'Zagreb', basePrice: 100, licensePlate: 'ZG' },
      { name: 'Split', basePrice: 90, licensePlate: 'ST' },
      { name: 'Rijeka', basePrice: 85, licensePlate: 'RI' },
      { name: 'Osijek', basePrice: 80, licensePlate: 'OS' },
      { name: 'Zadar', basePrice: 75, licensePlate: 'ZD' },
      { name: 'Slavonski Brod', basePrice: 70, licensePlate: 'SB' },
      { name: 'Pula', basePrice: 65, licensePlate: 'PU' },
      { name: 'Sesvete', basePrice: 60, licensePlate: 'ZG' }, // Part of Zagreb
      { name: 'Karlovac', basePrice: 55, licensePlate: 'KA' },
      { name: 'Varaždin', basePrice: 50, licensePlate: 'VŽ' },
      { name: 'Šibenik', basePrice: 45, licensePlate: 'ŠI' },
      { name: 'Dubrovnik', basePrice: 40, licensePlate: 'DU' },
      { name: 'Bjelovar', basePrice: 35, licensePlate: 'BJ' },
      { name: 'Kaštela', basePrice: 30, licensePlate: 'ST' }, // Part of Split-Dalmatia County
      { name: 'Sisak', basePrice: 25, licensePlate: 'SK' },
      { name: 'Vinkovci', basePrice: 20, licensePlate: 'VK' },
      { name: 'Velika Gorica', basePrice: 15, licensePlate: 'ZG' }, // Near Zagreb
      { name: 'Vukovar', basePrice: 10, licensePlate: 'VU' },
      { name: 'Samobor', basePrice: 5, licensePlate: 'ZG' }, // Near Zagreb
    ];

    await this.cityModel.insertMany(cities);
  }

  async migrateCoverages(): Promise<void> {
    const coverages = [
      { name: 'Bonus Protection', percentage: 12 },
      {
        name: 'AO+',
        minPrice: 55,
        maxPrice: 105,
        age: 30,
      },
      {
        name: 'Glass protection',
        percentage: 80,
      },
    ];

    await this.coverageModel.insertMany(coverages);
  }

  async migrateDiscounts(): Promise<void> {
    const discounts = [
      {
        name: 'Commercial discount',
        percentage: 10,
      },
      {
        name: 'Adviser discount',
        percentage: 20,
        numberOfCovrages: 2,
      },
      {
        name: 'VIP discount',
        percentage: 5,
        vehiclePower: 80,
      },
      {
        name: 'Strong car surcharge',
        percentage: 10,
        vehiclePower: 100,
      },
    ];

    await this.discountsModel.insertMany(discounts);
  }

  async findDiscountById(id: string): Promise<Discounts> {
    return await this.discountsModel.findById(id);
  }

  async findDiscountByName(name: string): Promise<Discounts> {
    return this.discountsModel.findOne({
      name: name,
    });
  }

  async findCityById(id: string): Promise<City> {
    return await this.cityModel.findById(id);
  }

  async findCoverageById(id: string): Promise<Coverage> {
    return await this.coverageModel.findById(id);
  }

  async findCoverageByName(name: string): Promise<Coverage> {
    return this.coverageModel.findOne({
      name: name,
    });
  }

  async findCityByName(name: string): Promise<City> {
    return this.cityModel.findOne({
      name: name,
    });
  }

  async getAllCities(): Promise<City[]> {
    return this.cityModel.find();
  }

  async getAllCoverages(): Promise<Coverage[]> {
    return this.coverageModel.find();
  }

  async getAllDiscounts(): Promise<Discounts[]> {
    return this.discountsModel.find();
  }

  async dropCollection(): Promise<void> {
    await this.cityModel.collection.drop();
    await this.coverageModel.collection.drop();
    await this.discountsModel.collection.drop();
  }
}
