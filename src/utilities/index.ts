import { appConfig } from "../appConfig";
import { IAppState } from "../context/AppContext";
import {
  ICollectCountOfProductsForEachDataPointFunc,
  IProduct,
} from "../interfaces";
const {
  list: { sortBy: sortByList },
} = appConfig;

export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export function filterProducts(allProducts: IProduct[], appState: IAppState) {
  let filteredAllProducts: IProduct[];

  // Search filter
  filteredAllProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(appState.search.toLowerCase())
  );

  // Filter by category
  filteredAllProducts = appState.selectedCategories.length
    ? filteredAllProducts.filter((product) =>
        product.category.some((cat) =>
          appState.selectedCategories.includes(cat)
        )
      )
    : filteredAllProducts;

  // Filter by Price range
  filteredAllProducts = filteredAllProducts.filter((product) => {
    const {
      range: { selected },
    } = appState;
    const [priceMin, priceMax] = selected;
    return product.price >= priceMin && product.price <= priceMax;
  });

  // Filter by sizes
  filteredAllProducts = appState.selectedSizes.length
    ? filteredAllProducts.filter((product) =>
        product.availableSizes.some((size) =>
          appState.selectedSizes.includes(size)
        )
      )
    : filteredAllProducts;

  // Filter by sortBy(price and order -> only ascending)
  filteredAllProducts = filteredAllProducts
    .slice()
    .sort((productA, productB) => {
      if (appState.sortBy === sortByList[0].value)
        return productA.price - productB.price;
      if (appState.sortBy === sortByList[1].value)
        return productA.name
          .toLowerCase()
          .localeCompare(productB.name.toLowerCase());
      return 0;
    });

  return filteredAllProducts;
}

export function collectCountOfProductsForEachDataPoint({
  min,
  max,
  xUnit = 50,
  merchandiseData,
  selectedRange,
}: ICollectCountOfProductsForEachDataPointFunc) {
  // collect data points on x-axis, 1 unit is $50; So possible points on x-axis is max - min / xUnit
  const countOfUnits = (max - min) / xUnit;
  const [selectedMin, selectedMax] = selectedRange;
  const countOfProductsForEachUnit = Array.from({ length: countOfUnits })
    .fill(0)
    .map((val, index) => {
      const minPriceVal = index * xUnit;
      const maxPriceVal = (index + 1) * xUnit;
      // minPriceVal and MaxPriceVal refers to the price range upperLimits for particular x-axis unit
      return merchandiseData.filter(
        (product) =>
          product.price > minPriceVal &&
          product.price <= maxPriceVal &&
          product.price > selectedMin &&
          product.price <= selectedMax
      ).length;
    });

  return countOfProductsForEachUnit;
}
