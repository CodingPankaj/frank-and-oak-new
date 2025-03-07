import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import { CardTop } from "../CardTop";
import { MainCardContainer } from "../MainCardCointainer";
import { SelectBox } from "../SelectBox";
import { SelectBoxOptions } from "../SelectBoxOptions";
import { InputField } from "../InputField";
import { AddProductSize } from "./AddProductSize";
import { AddProductColor } from "./AddProductColor";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { toastError } from "../../utils/tostifytoast";
import axios from "axios";

export const AddProductBasicInfo = ({
  formData,
  handleChange,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  productNameFieldError,
  productDescription,
  setProductDescription,
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
        <ProductCategoryAndSubCategory
          handleChange={handleChange}
          formData={formData}
        />
        <AddProductSize
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
        />
        <AddProductColor
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
        />

        <div className="product-input-container">
          <span className="add-product-label">Product Description</span>
          <ProductOverviewEditor
            productDescription={productDescription}
            setProductDescription={setProductDescription}
          />
        </div>
      </div>
    </MainCardContainer>
  );
};

const ProductCategoryAndSubCategory = ({ handleChange, formData }) => {
  const { categoryData, subcategoryData, getCategory, getSubcategory } =
    useContext(MainContext);

  const [subCat, getSubCat] = useState([]);

  useEffect(() => {
    if (categoryData.length === 0) {
      getCategory();
    }
    if (subcategoryData.length === 0) {
      getSubcategory();
    }
  }, []);

  useEffect(() => {
    const filterData = subcategoryData.filter(
      (item) => item?.parentCategory?._id === formData?.productParentCategory,
    );
    getSubCat(filterData);
  }, [formData.productParentCategory]);

  return (
    <div className="grid grid-cols-2">
      {/* product category */}
      <div className="product-input-container">
        <span className="add-product-label">Category</span>
        <SelectBox
          id="product-parent-category"
          name="productParentCategory"
          value={formData.productParentCategory}
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
          value={formData.productSubcategory}
          className="product-select-box"
        >
          <SelectBoxOptions
            value="select-subcategory"
            label="Select Sub category"
          />
          {subCat &&
            subCat.map((item, index) => (
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

// product description
const ProductOverviewEditor = ({
  productDescription,
  setProductDescription,
}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter product description...",
    }),
    [],
  );

  const handleEditorChange = (newContent) => {
    const sanitizedContent = DOMPurify.sanitize(newContent);
    setProductDescription(sanitizedContent);
  };

  return (
    <JoditEditor
      ref={editor}
      config={config}
      value={productDescription}
      onChange={handleEditorChange}
      id="product-description"
      name="productDescription"
      placeholder="Enter Product Short Description"
    />
  );
};
