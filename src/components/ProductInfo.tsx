import styled from "@emotion/styled";
import { FaChevronUp } from "react-icons/fa";

import { IProduct } from "../interfaces";
import Accordion from "./Accordion";

const ProductInfoWrapper = styled.div`
  padding: 3rem 2.5rem;
  overflow-y: auto;
  height: 100%;
  .product-image {
    width: 100%;
    object-fit: contain;
    height: 20rem;
  }
  .text-center {
    text-align: center;
  }
  .product-title {
    margin-top: 2rem;
    color: var(--base-font);
    font-size: 1.6rem;
    font-weight: 600;
  }
  .product-tagline {
    margin: 1rem 0 2rem;
    color: var(--base-grey);
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const AccordionContent = styled.div`
  display: grid;
  padding: 1rem 3rem 2.5rem;
  grid-template-columns: repeat(5, 1fr);

  .cell {
    justify-self: center;
    border: 1px solid var(--section-border);
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    transition: transform 0.3s ease-in-out;
  }

  .size-cell {
    width: 4.5rem;
    height: 4.5rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }

  &.composition-accordion-content {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    .composition-cell {
      width: 8rem;
      height: 7rem;
      flex-direction: column;
    }
    .composition-material {
      font-size: 1rem;
      color: var(--section-border);
      font-weight: 500;
      margin-top: 0.5rem;
      text-transform: uppercase;
    }
  }

  &.description-accordion-content {
    display: block;
    color: var(--base-grey);
    font-size: 1.2rem;
    padding: 0 3rem;
    line-height: 1.7;
    font-weight: 500;
  }
`;

interface IProductInfo {
  product: IProduct;
}

const ProductInfo = ({ product }: IProductInfo) => {
  const {
    images,
    name,
    feature,
    availableSizes,
    compositionsAvailable,
    description,
  } = product;
  const [primary] = images;

  return (
    <ProductInfoWrapper>
      <img className="product-image" src={primary.url} alt={primary.alt} />
      <h4 className="text-center product-title">{name}</h4>
      <h5 className="text-center product-tagline">{feature}</h5>
      <Accordion
        renderHeader={(setActive, setRotate, toggleAccordion) => {
          return (
            <button
              className={`accordion ${setActive}`}
              onClick={(e) => toggleAccordion(e)}
            >
              <p style={{ fontWeight: 500 }}>Select Size</p>
              <FaChevronUp
                className={`${setRotate}`}
                width={14}
                fill={"#777"}
              />
            </button>
          );
        }}
        renderContent={() => {
          return (
            <AccordionContent>
              {availableSizes.map((size) => {
                return <div className="size-cell cell">{size}</div>;
              })}
            </AccordionContent>
          );
        }}
      />
      <Accordion
        renderHeader={(setActive, setRotate, toggleAccordion) => {
          return (
            <button
              className={`accordion ${setActive}`}
              onClick={(e) => toggleAccordion(e)}
            >
              <p style={{ fontWeight: 500 }}>Composition</p>
              <FaChevronUp
                className={`${setRotate}`}
                width={14}
                fill={"#777"}
              />
            </button>
          );
        }}
        renderContent={() => {
          return (
            <AccordionContent className="composition-accordion-content">
              {compositionsAvailable.map((composition) => {
                return (
                  <div className="composition-cell cell">
                    <h5>{composition.percentage}</h5>
                    <p className="composition-material">
                      {composition.material}
                    </p>
                  </div>
                );
              })}
            </AccordionContent>
          );
        }}
      />
      <Accordion
        renderHeader={(setActive, setRotate, toggleAccordion) => {
          return (
            <button
              className={`accordion ${setActive}`}
              onClick={(e) => toggleAccordion(e)}
            >
              <p style={{ fontWeight: 500 }}>Description</p>
              <FaChevronUp
                className={`${setRotate}`}
                width={14}
                fill={"#777"}
              />
            </button>
          );
        }}
        renderContent={() => {
          return (
            <AccordionContent className="description-accordion-content">
              {description}
            </AccordionContent>
          );
        }}
      />
    </ProductInfoWrapper>
  );
};

export default ProductInfo;
