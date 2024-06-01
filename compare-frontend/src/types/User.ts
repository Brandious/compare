import { Coverages, Discounts } from "./../utils/coverages";

export type User = {
  fullName: string;
  birthDate: Date;
  city: string;
  vehiclePower: number;
  voucher?: number;
};

export type UserSuccess = {
  basePrice: number;
  birthDate: Date;
  city: string;
  fullName: string;
  vehiclePower: number;
  voucher?: number;
  _id: string;

  // Optional fields
  coverages?: Coverages[];
  discounts?: Discounts[];

  calculatedDiscounts?: number;
  calculatedCoverage?: number;
  finalPrice?: number;

  updatedAt: string;
};

export type UserFormData = {
  name: string;
  birthDate: Date;
  city: string;
  vehiclePower: number;
  voucher?: number;
};
