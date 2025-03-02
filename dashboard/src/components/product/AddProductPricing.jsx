import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";

export const AddProductPricing = () => {
  return (
    <MainCardContainer>
      <CardTop heading="Pricing" headingStyle="text-sm" />
      <div className="pb-3 pt-2">
        <div className="product-input-container">
          <label htmlFor="product-price" className="add-product-label">
            Product Price
          </label>
          <input
            type="text"
            id="product-price"
            placeholder="Enter Product Price"
            className="product-input"
          />
        </div>
        <AddProductDiscount />
        <div className="product-input-container">
          <label htmlFor="product-price" className="add-product-label">
            Discount
          </label>
          <input
            type="text"
            id="product-discount"
            placeholder="Enter Discount Rates"
            className="product-input"
          />
        </div>
        <div className="product-input-container">
          <label htmlFor="product-price" className="add-product-label">
            Discounted Price
          </label>
          <input
            type="text"
            id="discounted-price"
            placeholder="Discounted Price"
            className="product-input"
            disabled
          />
        </div>
      </div>
    </MainCardContainer>
  );
};

const AddProductDiscount = () => {
  return (
    <div className="product-input-container">
      <span htmlFor="discount-type" className="add-product-label">
        Discount Type
      </span>
      <div className="radio-container">
        <span className="add-product-label">No Discount</span>
        <input
          type="radio"
          name="discount-type"
          id="no-discount"
          className="input-radio"
        />
      </div>
      <div className="radio-container">
        <span className="add-product-label">Percentage %</span>
        <input
          type="radio"
          name="discount-type"
          id="percentage-discount"
          className="input-radio"
        />
      </div>
      <div className="radio-container">
        <span className="add-product-label">Fixed Discount</span>
        <input
          type="radio"
          name="discount-type"
          id="fixed-discount"
          className="input-radio"
        />
      </div>
    </div>
  );
};
