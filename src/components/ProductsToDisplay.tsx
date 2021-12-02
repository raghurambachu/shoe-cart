import styled from "@emotion/styled";
import { IProduct } from "../interfaces";
import Product from "./Product";

const ProductsToDisplayWrapper = styled.div`
  padding: 3rem 3rem;
  height: 100%;
  overflow: auto;
`;

const SectionTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 500;
`;

const SectionNav = styled.div`
  justify-content: space-between;
`;

const AllProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 3rem;
`;

interface IProductsToDisplay {
  allProducts: IProduct[];
}

const ProductsToDisplay = ({ allProducts }: IProductsToDisplay) => {
  return (
    <ProductsToDisplayWrapper>
      <SectionNav className="flex-align-center">
        <SectionTitle>New Arrivals</SectionTitle>
      </SectionNav>
      <AllProductsWrapper>
        {allProducts.map((product) => {
          return <Product product={product} />;
        })}
      </AllProductsWrapper>
    </ProductsToDisplayWrapper>
  );
};

export default ProductsToDisplay;
