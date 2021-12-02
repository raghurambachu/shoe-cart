import styled from "@emotion/styled";
import Header from "../Header";
import ProductsToDisplay from "../ProductsToDisplay";
import { merchandiseData } from "../../data";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces";

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
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setAllProducts(merchandiseData);
  }, []);

  return (
    <LayoutWrapper>
      <header className="header">
        <Header />
      </header>
      <aside className="left-sidebar"> </aside>
      <section className="scrollable">
        <ProductsToDisplay allProducts={allProducts} />
      </section>
      <aside className="right-sidebar"></aside>
    </LayoutWrapper>
  );
};

export default Layout;
