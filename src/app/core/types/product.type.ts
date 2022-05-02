import { BrandDetails } from './brand-details.type';

export type Product = {
  productName: string;
  brandResponse: BrandDetails[];
  countryOfOrigin: string[];
  fromBelarus: boolean;
  fromRussia: boolean;
};
