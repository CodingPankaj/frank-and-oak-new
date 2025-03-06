import { CardTop } from "../CardTop";
import { LinkBtnTwo } from "../LinkBtnTwo";
import { MainCardContainer } from "../MainCardCointainer";
import { SubmitBtn } from "../SubmitBtn";

export const AddProductSpecification = ({
  formData,
  handleChange,
  submitBtnLoader,
}) => {
  return (
    <MainCardContainer>
      <CardTop heading="Specification" headingStyle="text-sm" />
      <div className="pb-3 pt-2">
        <div className="product-input-container">
          <span className="add-product-label">Product Description</span>
          <textarea
            id="product-description"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            placeholder="Enter Product Despriction"
            className="product-input scrollbar h-[150px] overflow-y-auto"
          ></textarea>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <LinkBtnTwo>Save Draft</LinkBtnTwo>
          <SubmitBtn label="Add Product" submitBtnLoader={submitBtnLoader} />
        </div>
      </div>
    </MainCardContainer>
  );
};
