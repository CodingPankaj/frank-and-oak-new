import { useEffect, useState } from "react";
import { CardTop } from "../CardTop";
import { InputField } from "../InputField";
import { LinkBtnTwo } from "../LinkBtnTwo";
import { MainCardContainer } from "../MainCardCointainer";
import { SubmitBtn } from "../SubmitBtn";

export const AddProductPricing = ({
  formData,
  handleChange,
  productPriceFieldError,
  submitBtnLoader,
}) => {
  const [productSalePriceFieldError, setProductSalePriceFieldError] =
    useState(false);

  useEffect(() => {
    if (Number(formData.productSalePrice) > Number(formData.productPrice)) {
      setProductSalePriceFieldError(true);
    } else {
      setProductSalePriceFieldError(false);
    }
  }, [formData.productSalePrice]);

  return (
    <MainCardContainer>
      <CardTop heading="Pricing" headingStyle="text-sm" />
      <div className="pricing-section pb-3 pt-2">
        <InputField
          label="Product Price"
          type="number"
          id="product-price"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
          setInputFieldError={productPriceFieldError}
          placeholder="Enter Product Price"
          className="product-input"
        />

        <InputField
          label="Product Sale Price"
          type="number"
          id="product-sale-price"
          name="productSalePrice"
          value={formData.productSalePrice}
          onChange={handleChange}
          errorMessage="Product Sale Price Should be less than product price"
          setInputFieldError={productSalePriceFieldError}
          placeholder="Enter Product Sale Price"
          className="product-input"
        />

        <div className="mt-4 flex items-center justify-center gap-4">
          <LinkBtnTwo>Save Draft</LinkBtnTwo>
          <SubmitBtn label="Add Product" submitBtnLoader={submitBtnLoader} />
        </div>
      </div>
    </MainCardContainer>
  );
};
