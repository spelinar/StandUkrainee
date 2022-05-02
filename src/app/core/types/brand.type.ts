export type Brand = {
  id: string;
  brandName: string;
  normalizedBrandName?: string;
  companyName?: string;
};

export type BrandListItem = Brand & {
  header?: string;
};
