import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>;

@Schema({ collection: 'city', timestamps: true })
export class City {
  @Prop()
  name: string;

  @Prop()
  licensePlate: string;

  @Prop()
  basePrice: number;
}

export const CitySchema = SchemaFactory.createForClass(City);
