import styled from "@emotion/styled";
import { IProduct } from "../interfaces";

const ProductWrapper = styled.div`
  position:relative;
  border: 1px solid var(--section-border);
  padding: 3rem;
  border-radius: 2rem;
  margin-bottom: 3rem;
  width: 48%;
  .product-feature,.price-tag{
    color:var(--base-grey)
    font-weight: 500;
    font-size: 1.2rem;
  }
  .product-title {
    color: var(--font-base);
    font-weight: 500;
    font-size: 1.6rem;
    margin-top: 1rem;
  }
  .primary-image {
    width: 100%;
    padding: 1rem;
    height: 20rem;
    margin: 1rem 0 5rem;

  }
  .primary-image img {
    object-fit: cover;
    width: 100%;
    transform: rotateY(180deg)
  }
  .price-value{
      display:inline-block;
      margin-top: 1rem;
      font-size: 2.2rem;
      font-weight: 600;
  }
  .product-footer {
      display:flex;
      justify-content: space-between;
  }
  .right-side{
      display:flex;
  }
  
`;

const Band = styled.div`
  position: absolute;
  height: 4.5rem;
  padding: 1.5px;
  background: var(--base-red);
  left: -3px;
`;

const SecondaryImageWrapper = styled.div`
  border-radius: 0.4rem;
  margin-left: 2rem;
  border: 1px solid var(--section-border);
  padding: 0.25rem;
  & > img {
    object-fit: cover;
    width: 3.6rem;
    height: 3.6rem;
  }
`;

interface IIndividualProduct {
  product: IProduct;
}

const Product = ({ product }: IIndividualProduct) => {
  const { feature, name, images, price } = product;
  const [primaryImage, secondaryImage, tertiaryImage] = images;
  return (
    <ProductWrapper>
      <Band />
      <h5 className="product-feature">{feature}</h5>
      <h3 className="product-title">{name}</h3>
      <div className="primary-image">
        <img src={primaryImage.url} alt={primaryImage.alt} />
      </div>
      <div className="product-footer">
        <div className="left-side">
          <h5 className="price-tag">Price</h5>
          <span className="price-value">{`$ ${price}`}</span>
        </div>
        <div className="right-side">
          <SecondaryImageWrapper>
            <img src={secondaryImage.url} alt={secondaryImage.alt} />
          </SecondaryImageWrapper>
          <SecondaryImageWrapper>
            <img src={tertiaryImage.url} alt={tertiaryImage.alt} />
          </SecondaryImageWrapper>
        </div>
      </div>
    </ProductWrapper>
  );
};

export default Product;
