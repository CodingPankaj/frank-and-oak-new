import { MainSection } from "../components/MainSection";
import { MainCardContainer } from "../components/MainCardCointainer";
import { CardTop } from "../components/CardTop";
import { LinkBtnTwo } from "../components/LinkBtnTwo";
import { AddProductPics } from "../components/product/AddProductPics";
import { AddProductBasicInfo } from "../components/product/AddProductBasicInfo";
import { AddProductPricing } from "../components/product/AddProductPricing";
import { ProductPreview } from "../components/product/ProductPreview";
import { useState } from "react";
import { getInputValue } from "../utils/getInputValue";
import { toastError, toastSuccess } from "../utils/tostifytoast";
import axios from "axios";
import { SubmitBtn } from "../components/SubmitBtn";

export const AddProducts = () => {
  const emptyData = {
    _id: "",
    productName: "",
    productPrice: "",
    productSalePrice: "",
    productParentCategory: "",
    productSubcategory: "",
    productSizes: [],
    productColors: "",
  };
  const [formData, setFormData] = useState(emptyData);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productDescription, setProductDescription] = useState("");

  // errors
  const [productNameFieldError, setProductNameFieldError] = useState(false);
  const [productPriceFieldError, setProductPriceFieldError] = useState(false);
  const [submitBtnLoader, setSubmitBtnLoader] = useState(false);

  // handle change
  const handleChange = (e) => {
    getInputValue(e, setFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      _id,
      productName,
      productPrice,
      productSalePrice,
      productParentCategory,
      productSubcategory,
    } = formData;

    // return console.log(selectedSizes);
    if (!productName && productName.trim() === "") {
      setProductNameFieldError(true);
      return toastError("Product Name is Required");
    }

    if (!productPrice || productPrice.trim() === "") {
      setProductPriceFieldError(true);
      return toastError("Product Price is Required");
    }

    if (!productDescription || productDescription.trim() === "") {
      return toastError("Product Description is Required");
    }

    if (
      !productParentCategory ||
      productParentCategory.trim() === "" ||
      productParentCategory === "select-category"
    ) {
      return toastError("Product Category is Required");
    }

    if (
      !productSubcategory ||
      productSubcategory.trim() === "" ||
      productSubcategory === "select-subcategory"
    ) {
      return toastError("Product Sub Category is Required");
    }

    if (selectedSizes.length === 0) {
      return toastError("Product Sizes are Required");
    }

    if (selectedColors.length === 0) {
      return toastError("Product Colors are Required");
    }

    if (productImages.length === 0) {
      return toastError("Product Images are Required");
    }

    const newFormData = new FormData();

    newFormData.append("productName", productName.trim());
    newFormData.append("productDescription", productDescription.trim());
    newFormData.append("productParentCategory", productParentCategory);
    newFormData.append("productSubcategory", productSubcategory);
    newFormData.append("productPrice", productPrice.trim());
    newFormData.append("productSalePrice", productSalePrice.trim());

    // Append sizes one by one
    selectedSizes.forEach((size) => {
      newFormData.append("productSizes[]", size._id);
    });

    // Append colors one by one
    selectedColors.forEach((color) => {
      newFormData.append("productColors[]", color._id);
    });

    // Append images one by one
    productImages.forEach((image, index) => {
      newFormData.append("productImages", image);
    });

    // end point
    const endpoint = "admin/product/add";

    // disble button
    setSubmitBtnLoader(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        setFormData(emptyData);
        setProductDescription("");
        setSelectedSizes([]);
        setSelectedColors([]);
        setProductImages([]);
        setSubmitBtnLoader(false);
        toastSuccess("Product Added Successfully");
      }
    } catch (error) {
      setSubmitBtnLoader(false);
      toastError("Failed to add Product");
    }
  };
  return (
    <MainSection>
      <MainCardContainer>
        <CardTop heading="Add Product" className="border-0">
          <div className="flex items-center justify-center gap-4">
            <LinkBtnTwo>Save Draft</LinkBtnTwo>
            <SubmitBtn label="Add Product" onClick={handleSubmit} />
          </div>
        </CardTop>
      </MainCardContainer>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto]">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          <AddProductBasicInfo
            formData={formData}
            setFormData={setFormData}
            productDescription={productDescription}
            setProductDescription={setProductDescription}
            handleChange={handleChange}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            productNameFieldError={productNameFieldError}
          />
          <AddProductPics
            productImages={productImages}
            setProductImages={setProductImages}
          />
          <AddProductPricing
            formData={formData}
            handleChange={handleChange}
            productPriceFieldError={productPriceFieldError}
            submitBtnLoader={submitBtnLoader}
          />
        </form>
        <div className="lg:w-[350px]">
          <ProductPreview
            formData={formData}
            productImages={productImages}
            selectedColors={selectedColors}
            selectedSizes={selectedSizes}
            productDescription={productDescription}
          />
        </div>
      </div>
    </MainSection>
  );
};
