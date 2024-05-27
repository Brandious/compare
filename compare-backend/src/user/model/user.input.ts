import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  fullName: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthDate: Date;

  @IsString()
  city: string;

  @IsNumber()
  vehiclePower: number;

  @IsOptional()
  @IsNumber()
  voucher: number | null;
}
