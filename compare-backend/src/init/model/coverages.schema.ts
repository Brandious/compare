import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoverageDocument = HydratedDocument<Coverage>;

@Schema({ collection: 'coverages', timestamps: true })
export class Coverage {
  @Prop()
  name: string;

  @Prop()
  percentage: number;

  @Prop()
  minPrice: number;

  @Prop()
  maxPrice: number;

  @Prop()
  age: number;
}

export const CoverageSchema = SchemaFactory.createForClass(Coverage);
