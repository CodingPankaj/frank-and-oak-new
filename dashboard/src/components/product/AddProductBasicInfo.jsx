import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";
import { SelectBox } from "../SelectBox";
import { SelectBoxOptions } from "../SelectBoxOptions";
import { InputField } from "../InputField";
import { AddProductSize } from "./AddProductSize";
import { AddProductColor } from "./AddProductColor";
import { useContext, useEffect } from "react";
import { MainContext } from "../../context/MainContext";

export const AddProductBasicInfo = ({
  formData,
  handleChange,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  productNameFieldError,
}) => {
  return (
    <MainCardContainer>
      <CardTop heading="Basic Info" headingStyle="text-sm" />
      <div className="pb-3 pt-2">
        {/* Product Name */}
        <InputField
          label="Product Name"
          type="text"
          id="product-name"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          setInputFieldError={productNameFieldError}
          placeholder="Enter Product Name"
        />
        <ProductCategoryAndSubCategory handleChange={handleChange} />
        <AddProductSize
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
        />
        <AddProductColor
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
        />

        <div className="product-input-container">
          <span className="add-product-label">Product Short Description</span>

          <textarea
            id="product-short-description"
            name="productShortDescription"
            value={formData.productShortDescription}
            onChange={handleChange}
            placeholder="Enter Product Short Description"
            className="product-input scrollbar h-[150px] overflow-y-auto"
          ></textarea>
        </div>
      </div>
    </MainCardContainer>
  );
};

const ProductCategoryAndSubCategory = ({ handleChange }) => {
  const { categoryData, subcategoryData, getCategory, getSubcategory } =
    useContext(MainContext);

  useEffect(() => {
    if (categoryData.length === 0) {
      getCategory();
    }
    if (subcategoryData.length === 0) {
      getSubcategory();
    }
  }, []);

  return (
    <div className="grid grid-cols-2">
      {/* product category */}
      <div className="product-input-container">
        <span className="add-product-label">Category</span>
        <SelectBox
          id="product-parent-category"
          name="productParentCategory"
          onChange={handleChange}
          className="product-select-box"
        >
          <SelectBoxOptions value="select-category" label="Select Category" />
          {categoryData &&
            categoryData.map((item, index) => (
              <SelectBoxOptions
                key={index}
                value={item._id}
                label={item.categoryName}
              />
            ))}
        </SelectBox>
      </div>
      {/* Product sub category */}
      <div className="product-input-container grow">
        <span className="add-product-label">Sub Category</span>
        <SelectBox
          id="product-sub-category"
          name="productSubcategory"
          onChange={handleChange}
          className="product-select-box"
        >
          <SelectBoxOptions
            value="select-subcategory"
            label="Select Sub category"
          />
          {subcategoryData &&
            subcategoryData.map((item, index) => (
              <SelectBoxOptions
                key={index}
                value={item._id}
                label={item.subcategoryName}
              />
            ))}
        </SelectBox>
      </div>
    </div>
  );
};
