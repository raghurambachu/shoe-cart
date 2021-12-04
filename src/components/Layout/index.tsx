import styled from "@emotion/styled";
import Header from "../Header";
import ProductsToDisplay from "../ProductsToDisplay";
import { merchandiseData } from "../../data";
import { useContext, useEffect, useState } from "react";
import { IProduct } from "../../interfaces";
import { AppContext, IAppState } from "../../context/AppContext";
import { appConfig } from "../../appConfig";
import Sidebar from "../Sidebar";
import ProductInfo from "../ProductInfo";

const LayoutWrapper = styled.div`
  display: grid;
  max-height: 100vh;
  grid-template-columns: 30rem 1fr 40rem;
  grid-template-rows: 8rem calc(100vh - 8rem);
  grid-template-areas:
    "header header header"
    "lsidebar scrollable rsidebar";

  .header {
    grid-area: header;
    border-bottom: 1px solid var(--section-border);
    height: 100%;
  }
  .left-sidebar,
  .scrollable,
  .right-sidebar {
    height: 100%;
  }
  .left-sidebar {
    grid-area: lsidebar;
    border-right: 1px solid var(--section-border);
  }
  .scrollable {
    grid-area: scrollable;
    max-height: 100vh - 8rem;
  }
  .right-sidebar {
    grid-area: rsidebar;
    border-left: 1px solid var(--section-border);
  }
`;

const Layout = () => {
  const { appState } = useContext(AppContext);
  const {
    list: { sortBy: sortByList },
  } = appConfig;
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct>({} as IProduct);

  function filterProducts(allProducts: IProduct[], appState: IAppState) {
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

  useEffect(() => {
    const filteredAllProducts = filterProducts(merchandiseData, appState);
    setAllProducts(filteredAllProducts);
  }, [appState]);

  useEffect(() => {
    const productVal =
      appState.selectedProduct &&
      !!allProducts.find(
        (productItem) => productItem.sku === appState.selectedProduct
      )
        ? (allProducts.find(
            (productItem) => productItem.sku === appState.selectedProduct
          ) as IProduct)
        : allProducts.length
        ? allProducts[0]
        : ({} as IProduct);

    setProduct(productVal);
  }, [appState.selectedProduct, allProducts]);
  console.log(product);
  return (
    <LayoutWrapper>
      <header className="header">
        <Header />
      </header>
      <aside className="left-sidebar">
        <Sidebar />
      </aside>
      <section className="scrollable">
        <ProductsToDisplay allProducts={allProducts} />
      </section>
      <aside className="right-sidebar">
        {Object.keys(product || {}).length > 0 && (
          <ProductInfo product={product} />
        )}
      </aside>
    </LayoutWrapper>
  );
};

export default Layout;
