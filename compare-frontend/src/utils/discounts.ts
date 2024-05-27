// enum discounts
export enum discounts {
  "COMMERCIAL_DISCOUNT" = 1,
  "AGENTS_DISCOUNT" = 2,
  "SUMMER_DISCOUNT" = 3,
  "STRONG_CAR_SURCHARGE" = 4,
  "VIP_DISCOUNT" = 5,
  "STRONG_CAR_DISCOUNT" = 6,
  "VOUCHER_DISCOUNT" = 7,
}

export const getDiscounts = () => {
  return Object.keys(discounts)
    .filter((key) => isNaN(Number(key))) // Filter out numeric keys
    .map((key) =>
      key
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    ); // Format keys
};
