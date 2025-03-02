import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";
import { SelectBox } from "../SelectBox";
import { SelectBoxOptions } from "../SelectBoxOptions";
import productSizes from "../../api/productSizes.json";
import productBrands from "../../api/productBrands.json";
import productCategory from "../../api/productCategory.json";
import productSubCategory from "../../api/productSubCategory.json";
import productGender from "../../api/productGender.json";
import productColors from "../../api/productColors.json";

export const AddProductBasicInfo = () => {
  return (
    <MainCardContainer>
      <CardTop heading="Basic Info" headingStyle="text-sm" />
      <div className="pb-3 pt-2">
        <div className="product-input-container">
          <label htmlFor="product-name" className="add-product-label">
            Product Name
          </label>
          <input
            type="text"
            id="product-name"
            placeholder="Enter Product Name"
            className="product-input"
          />
        </div>
        <OtherInfo />
        <div className="product-input-container">
          <label htmlFor="product-description" className="add-product-label">
            Product Description
          </label>

          <textarea
            id="product-description"
            placeholder="Enter Product Description"
            className="product-input scrollbar h-[150px] overflow-y-auto"
          ></textarea>
        </div>
      </div>
    </MainCardContainer>
  );
};

const OtherInfo = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="product-input-container">
          <label htmlFor="product-name" className="add-product-label">
            Size
          </label>
          <SelectBox id="product-size" className="product-select-box">
            {productSizes &&
              productSizes.map((item, index) => (
                <SelectBoxOptions
                  key={index}
                  value={item.value}
                  label={item.label}
                />
              ))}
          </SelectBox>
        </div>
        <div className="product-input-container grow">
          <label htmlFor="product-name" className="add-product-label">
            Brand
          </label>
          <SelectBox id="product-brand" className="product-select-box">
            {productBrands &&
              productBrands.map((item, index) => (
                <SelectBoxOptions
                  key={index}
                  value={item.value}
                  label={item.label}
                />
              ))}
          </SelectBox>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="product-input-container">
          <label htmlFor="product-category" className="add-product-label">
            Category
          </label>
          <SelectBox id="product-category" className="product-select-box">
            {productCategory &&
              productCategory.map((item, index) => (
                <SelectBoxOptions
                  key={index}
                  value={item.value}
                  label={item.label}
                />
              ))}
          </SelectBox>
        </div>
        <div className="product-input-container grow">
          <label htmlFor="product-sub-category" className="add-product-label">
            Sub Category
          </label>
          <SelectBox id="product-sub-category" className="product-select-box">
            {productSubCategory &&
              productSubCategory.map((item, index) => (
                <SelectBoxOptions
                  key={index}
                  value={item.value}
                  label={item.label}
                />
              ))}
          </SelectBox>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="product-input-container">
          <label htmlFor="product-gender" className="add-product-label">
            Gender
          </label>
          <SelectBox id="product-gender" className="product-select-box">
            {productGender &&
              productGender.map((item, index) => (
                <SelectBoxOptions
                  key={index}
                  value={item.value}
                  label={item.label}
                />
              ))}
          </SelectBox>
        </div>
        <div className="product-input-container grow">
          <label htmlFor="product-color" className="add-product-label">
            Colors
          </label>
          <SelectBox id="product-color" className="product-select-box">
            {productColors &&
              productColors.map((item, index) => (
                <SelectBoxOptions
                  key={index}
                  value={item.value}
                  label={item.label}
                />
              ))}
          </SelectBox>
        </div>
      </div>
    </>
  );
};
