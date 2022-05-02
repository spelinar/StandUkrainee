import { VsRussiaStatus } from '../enums/vs-russia-status.enum';

import { OtherBrand } from './other-brand.type';

export type BrandDetails = {
  id: string;
  company: string;
  headquarters: string;
  articles: any[];
  lastDeployedUpdate: string;
  logo: string;
  color: number;
  vsRussia: string;
  shortvsRussia: string;
  vsRussiaStatus: VsRussiaStatus;
  otherBrands: OtherBrand[];
};
