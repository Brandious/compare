import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CoveragesInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  percentage: number | null;

  @IsOptional()
  @IsNumber()
  minPrice: number | null;

  @IsOptional()
  @IsNumber()
  maxPrice: number | null;

  @IsOptional()
  @IsNumber()
  age: number | null;
}
