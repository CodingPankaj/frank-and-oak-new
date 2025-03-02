import { CardTop } from "../CardTop";
import { LinkBtnOne } from "../LinkBtnOne";
import { LinkBtnTwo } from "../LinkBtnTwo";
import { MainCardContainer } from "../MainCardCointainer";

export const AddProductSpecification = () => {
  return (
    <MainCardContainer>
      <CardTop heading="Specification" headingStyle="text-sm" />
      <div className="pb-3 pt-2">
        <div className="product-input-container">
          <label htmlFor="product-weight" className="add-product-label">
            Product Weight
          </label>
          <input
            type="text"
            id="product-weight"
            placeholder="Enter Product Weight in gm"
            className="product-input"
          />
        </div>

        <div className="product-input-container">
          <label htmlFor="product-specification" className="add-product-label">
            Product Description
          </label>

          <textarea
            id="product-specification"
            placeholder="Enter Product Specification"
            className="product-input scrollbar h-[150px] overflow-y-auto"
          ></textarea>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <LinkBtnTwo>Save Draft</LinkBtnTwo>
          <LinkBtnOne>Publish</LinkBtnOne>
        </div>
      </div>
    </MainCardContainer>
  );
};
