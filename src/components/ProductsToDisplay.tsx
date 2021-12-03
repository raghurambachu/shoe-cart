import styled from "@emotion/styled";
import { useContext } from "react";
import { appConfig } from "../appConfig";
import {
  AppContext,
  IAppState,
  TAppReducerAction,
} from "../context/AppContext";
import { IProduct } from "../interfaces";
import Product from "./Product";
import SortDropdown from "./SortDropdown";

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
  const { appState, appDispatch } = useContext(AppContext);
  const {
    list: { sortBy: sortByList },
  } = appConfig;

  // Todo: move to appConfig
  return (
    <ProductsToDisplayWrapper>
      <SectionNav className="flex-align-center">
        <SectionTitle>New Arrivals</SectionTitle>
        <SortDropdown
          itemsToDisplay={sortByList}
          onChange={(selectedValue: string) => {
            appDispatch({
              type: "SET_SORTBY",
              payload: {
                sortBy: selectedValue,
              },
            });
          }}
          defaultText="Sort by"
          selectedItem={appState.sortBy}
          width={13}
        />
      </SectionNav>
      <AllProductsWrapper>
        {allProducts.map((product) => {
          return <Product key={product.sku} product={product} />;
        })}
      </AllProductsWrapper>
    </ProductsToDisplayWrapper>
  );
};

export default ProductsToDisplay;
