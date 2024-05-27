import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DiscountsDocument = HydratedDocument<Discounts>;

@Schema({ collection: 'discounts', timestamps: true })
export class Discounts {
  @Prop()
  name: string;

  @Prop()
  percentage: number;

  @Prop()
  numberOfCovrages: number;

  @Prop()
  vehiclePower: number;
}

export const DiscountsSchema = SchemaFactory.createForClass(Discounts);
