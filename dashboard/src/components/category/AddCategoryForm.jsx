import { useEffect, useState } from "react";
import { CardTop } from "../CardTop";
import { LinkBtnTwo } from "../LinkBtnTwo";
import { MainCardContainer } from "../MainCardCointainer";
import { SelectBox } from "../SelectBox";
import { SelectBoxOptions } from "../SelectBoxOptions";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { RadioStatusButton } from "../RadioStatusButton";
import { InputField } from "../InputField";
import { getInputValue } from "../../utils/getInputValue";
import { SubmitBtn } from "../../components/SubmitBtn";
import { toastError, toastSuccess } from "../../utils/tostifytoast";

export const AddCategoryForm = ({
  getCategory,
  categoryData,
  inputData,
  setInputData,
  imageUrl,
  setImageUrl,
  oldCategoryData,
  setOldCategoryData,
}) => {
  const [categoryImage, setCategoryImage] = useState("");
  const [inputFieldNameError, setInputFieldNameError] = useState(false);
  const [submitBtnLoader, setSubmitBtnLoader] = useState(false);
  const [radioBtnStatus, setRadioBtnStatus] = useState(true);

  // const empty form data
  const emptyFormData = {
    _id: "",
    categoryName: "",
    categoryDescription: "",
    categoryType: "parent-category",
  };

  // handle input change
  const handleChange = (e) => {
    getInputValue(e, setInputData);
  };

  // handle file
  const handleFile = (e) => {
    setCategoryImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { categoryName, categoryDescription, categoryType, _id } = inputData;

    if (!categoryName) {
      setInputFieldNameError(true);
      return toastError("category name cannot be empty");
    }

    // create form data and append fields
    const formData = new FormData();

    // If _id is present, then update the existing category
    if (_id) {
      // If the category name has changed, then append the new category name to formData
      if (oldCategoryData.categoryName !== categoryName) {
        formData.append("categoryName", categoryName);
      }

      // If the category description has changed, then append the new category description to formData
      if (oldCategoryData.categoryDescription !== categoryDescription) {
        formData.append("categoryDescription", categoryDescription);
      }

      // If the category status has changed, then append the new category status to formData
      if (oldCategoryData.categoryStatus !== radioBtnStatus) {
        formData.append("categoryStatus", radioBtnStatus);
      }

      // If the category image has changed, then append the new category image to formData
      if (oldCategoryData.categoryImage !== imageUrl) {
        formData.append("categoryImage", categoryImage);
      }

      // check if form data is empty
      const isFormDataEmpty = formData.entries().next().done;

      if (isFormDataEmpty) {
        return toastError("Make any changes to update category");
      }

      // append _id to form data
      formData.append("_id", _id);
    }

    // If _id is not  present, then add new category
    if (!_id) {
      formData.append("categoryName", inputData.categoryName);
      formData.append("categoryDescription", inputData.categoryDescription);
      formData.append("categoryStatus", radioBtnStatus);
      if (!categoryImage) {
        return toastError("Category image is required");
      }
      formData.append("categoryImage", categoryImage);
    }

    // set button loader and disable submit button
    setSubmitBtnLoader(true);

    // change api end point for parent category and sub category
    const apiEndpoint =
      Object.keys(oldCategoryData).length === 0
        ? "admin/category/add"
        : `admin/category/update`;

    const apiMethod =
      Object.keys(oldCategoryData).length === 0 ? "post" : "patch";

    // send data to server
    try {
      const res = await axios[apiMethod](
        `${import.meta.env.VITE_API_BASE_URL}${apiEndpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        toastSuccess(_id ? "Category Updated" : "New Category Added");
        setInputData(emptyFormData);
        setOldCategoryData({});
        setImageUrl("");
        setInputFieldNameError(false);
        setRadioBtnStatus(true);
        setSubmitBtnLoader(false);
        getCategory();
      }
    } catch (error) {
      toastError("Failed to add product");
      setSubmitBtnLoader(false);
      console.log(error);
    }
  };
  return (
    <MainCardContainer>
      <CardTop heading="Add Category" headingStyle="text-sm" />
      <form onSubmit={handleSubmit} className="pb-10">
        {/* Category Name Input */}
        <div className="pb-3 pt-2">
          <InputField
            label="Category Name"
            type="text"
            id="category-name"
            name="categoryName"
            onChange={handleChange}
            value={inputData.categoryName}
            setInputFieldError={inputFieldNameError}
            placeholder="Enter Category Name"
          />
        </div>

        {/* Category Image Input */}
        <div className="flex flex-col gap-4 p-4">
          <span className="add-product-label">Category Image</span>
          <label
            htmlFor="product-image-upload"
            className="w-full cursor-pointer rounded border border-dashed border-accent-color/60 bg-accent-color/10 px-4 py-8 text-center text-[13px] text-text-color-3"
          >
            <span className="mr-1 text-2xl">📷</span>
            Drag & Drop your images or <span className="underline">Browse</span>
            <input
              type="file"
              onChange={handleFile}
              id="product-image-upload"
              accept="image/*"
              className="hidden"
            />
          </label>
          {imageUrl && (
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              <div className="relative aspect-square w-full overflow-hidden rounded">
                <img
                  src={imageUrl}
                  alt="thumbnail"
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => setImageUrl("")}
                  className="absolute right-1 top-1 flex items-center justify-center rounded-full bg-red-500 text-sm text-white lg:size-4 xl:size-5"
                >
                  <MdClose />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category Type Dropdown */}
        <div className="product-input-container">
          <span htmlFor="category-type" className="add-product-label">
            Parent Category
          </span>
          <SelectBox
            id="category-type"
            className="product-select-box"
            name="categoryType"
            onChange={handleChange}
          >
            <SelectBoxOptions
              value="parent-category"
              label="Select Parent Category"
            />
            {categoryData &&
              categoryData.length > 0 &&
              categoryData.map((item, index) => (
                <SelectBoxOptions
                  key={item._id ?? index}
                  value={item.categoryName}
                  label={item.categoryName}
                />
              ))}
          </SelectBox>
        </div>

        {/* Category Description */}
        <div className="product-input-container">
          <label htmlFor="category-description" className="add-product-label">
            Category Description
          </label>

          <textarea
            id="category-description"
            name="categoryDescription"
            onChange={handleChange}
            value={inputData.categoryDescription}
            placeholder="Enter Category Description"
            className="product-input scrollbar h-[150px] overflow-y-auto"
          ></textarea>
        </div>

        {/* Category Status */}
        <RadioStatusButton
          radioBtnStatus={radioBtnStatus}
          setRadioBtnStatus={setRadioBtnStatus}
        />
        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <LinkBtnTwo>Save Draft</LinkBtnTwo>
          <SubmitBtn label="Add Size" submitBtnLoader={submitBtnLoader} />
        </div>
      </form>
    </MainCardContainer>
  );
};
