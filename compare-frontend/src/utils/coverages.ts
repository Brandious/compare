export type Coverages = {
  _id: string;
  name: string;
  percentage?: number;
  minPrice?: number;
  maxPrice?: number;
  age?: number;
};

export type Discounts = {
  _id: string;
  name: string;
  percentage?: number;
  numberOfCovrages?: number;
  vehiclePower?: number;
};
