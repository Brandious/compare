import { IsNumber, IsString } from 'class-validator';

export class CityInput {
  @IsString()
  name: string;

  @IsString()
  licensePlate: string;

  @IsNumber()
  basePrice: number;
}
