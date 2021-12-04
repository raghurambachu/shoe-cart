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

export interface IOption {
  label: string;
  value: string;
}

export interface ICollectCountOfProductsForEachDataPointFunc {
  min: number;
  max: number;
  xUnit?: number;
  merchandiseData: IProduct[];
}
