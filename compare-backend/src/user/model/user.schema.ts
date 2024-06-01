import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Coverage } from 'src/init/model/coverages.schema';
import { Discounts } from 'src/init/model/discounts.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop()
  fullName: string;

  @Prop()
  birthDate: Date;

  @Prop()
  city: string;

  @Prop()
  vehiclePower: number;

  @Prop()
  voucher: number;

  @Prop()
  basePrice: number;

  @Prop()
  calculatedDiscounts: number;

  @Prop()
  calculatedCoverage: number;

  @Prop()
  finalPrice: number;

  @Prop()
  coverages: Coverage[];

  @Prop()
  discounts: Discounts[];
}

export const UserSchema = SchemaFactory.createForClass(User);
