export interface IProductImage {
  url: string;
  alt: string;
}

export interface IProductComposition {
  material: string;
  percentage: number;
}

export interface IProduct {
  sku: string;
  feature: string;
  name: string;
  images: IProductImage[];
  band: string;
  price: number;
  category: string[];
  availableSizes: number[];
  compositionsAvailable: IProductComposition[];
  description: string;
}

export interface IDropdownListItem {
  label: string;
  value: string;
}
