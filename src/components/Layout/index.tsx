import styled from "@emotion/styled";
import Header from "../Header";
import ProductsToDisplay from "../ProductsToDisplay";
import { merchandiseData } from "../../data";
import { useContext, useEffect, useState } from "react";
import { IProduct } from "../../interfaces";
import { AppContext } from "../../context/AppContext";
import Sidebar from "../Sidebar";
import ProductInfo from "../ProductInfo";
import { filterProducts } from "../../utilities";

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

  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct>({} as IProduct);

  useEffect(() => {
    const filteredAllProducts = filterProducts(merchandiseData, appState);
    setAllProducts(filteredAllProducts);
  }, [appState]);

  useEffect(() => {
    // set product to be shown in right sidebar based on sku
    // If no sku - that is user hasn't selected any product, show first product of filtered output
    // If user selected and exists in filteredProducts - show the product
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
