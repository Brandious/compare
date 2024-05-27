import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DiscountsInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  percentage: number | null;

  @IsOptional()
  @IsNumber()
  numberOfCovrages: number | null;

  @IsOptional()
  @IsNumber()
  vehiclePower: number | null;
}
