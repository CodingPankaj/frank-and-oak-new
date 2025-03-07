import { useContext, useState } from "react";
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
import { MainContext } from "../../context/MainContext";

export const AddSubcategoryForm = ({
  inputData,
  setInputData,
  imageUrl,
  setImageUrl,
  oldSubcategoryData,
  setOldSubcategoryData,
  getSubcategory,
  radioBtnStatus,
  setRadioBtnStatus,
}) => {
  const { categoryData } = useContext(MainContext);
  const [subcategoryImage, setSubcategoryImage] = useState("");
  const [inputFieldNameError, setInputFieldNameError] = useState(false);
  const [submitBtnLoader, setSubmitBtnLoader] = useState(false);

  // const empty form data
  const emptyFormData = {
    _id: "",
    subcategoryName: "",
    parentCategory: "select-parent-category",
    subcategoryDescription: "",
  };

  // handle input change
  const handleChange = (e) => {
    getInputValue(e, setInputData);
  };

  // handle file
  const handleFile = (e) => {
    setSubcategoryImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { _id, subcategoryName, subcategoryDescription, parentCategory } =
      inputData;

    if (!subcategoryName) {
      setInputFieldNameError(true);
      return toastError("category name cannot be empty");
    }

    // create form data and append fields
    const formData = new FormData();

    // If _id is present, then update the existing category
    if (_id) {
      // If the sub category name has changed, then append the new sub category name to formData
      if (oldSubcategoryData.subcategoryName !== subcategoryName) {
        formData.append("subcategoryName", subcategoryName);
      }

      // If the sub category description has changed, then append the new sub category description to formData
      if (
        oldSubcategoryData.subcategoryDescription !== subcategoryDescription
      ) {
        formData.append("subcategoryDescription", subcategoryDescription);
      }

      // If the sub category status has changed, then append the new sub category status to formData
      if (oldSubcategoryData.categoryStatus !== radioBtnStatus) {
        formData.append("categoryStatus", radioBtnStatus);
      }

      // If the sub category image has changed, then append the new sub category image to formData
      if (oldSubcategoryData.subcategoryImage !== imageUrl) {
        formData.append("subcategoryImage", subcategoryImage);
      }

      // check if form data is empty
      const isFormDataEmpty = formData.entries().next().done;

      if (isFormDataEmpty) {
        return toastError("Make any changes to update sub category");
      }

      // append _id to form data
      formData.append("_id", _id);
    }

    // If _id is not  present, then add new category
    if (!_id) {
      // append category name
      formData.append("subcategoryName", inputData.subcategoryName);

      // check for sub category image
      if (!subcategoryImage) {
        return toastError("Sub Category image is required");
      }

      // append sub category image
      formData.append("subcategoryImage", subcategoryImage);

      // checck for parent category
      if (parentCategory === "select-parent-category") {
        return toastError("Select parent category");
      }

      // append parent category
      formData.append("parentCategory", parentCategory);

      // append sub category description
      formData.append(
        "subcategoryDescription",
        inputData.subcategoryDescription,
      );

      // append cateegory status
      formData.append("categoryStatus", radioBtnStatus);
    }

    // set button loader and disable submit button
    setSubmitBtnLoader(true);

    // change api end point for parent category and sub category by checking if id and parent category id is present

    const apiEndpoint = _id
      ? `admin/subcategory/update`
      : "admin/subcategory/add";
    const apiMethod = _id ? "patch" : "post";

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
        toastSuccess(_id ? "Sub category updated" : "New sub category added");
        setInputData(emptyFormData);
        setOldSubcategoryData({});
        setImageUrl("");
        setInputFieldNameError(false);
        setRadioBtnStatus(true);
        setSubmitBtnLoader(false);
        getSubcategory();
      }
    } catch (error) {
      toastError("Failed to add sub categopry");
      setSubmitBtnLoader(false);
      console.log(error);
    }
  };
  return (
    <MainCardContainer>
      <CardTop heading="Add Sub Category" headingStyle="text-sm" />
      <form onSubmit={handleSubmit} className="pb-10">
        {/* Category Name Input */}
        <div className="pb-3 pt-2">
          <InputField
            label="Sub Category Name"
            type="text"
            id="subcategory-name"
            name="subcategoryName"
            onChange={handleChange}
            value={inputData.subcategoryName}
            setInputFieldError={inputFieldNameError}
            placeholder="Enter Sub Category Name"
          />
        </div>

        {/* Category Image Input */}

        <div className="flex flex-col gap-4 p-4">
          <span className="add-product-label">Sub Category Image</span>
          <label
            htmlFor="sub-category-image-upload"
            className="w-full cursor-pointer rounded border border-dashed border-accent-color/60 bg-accent-color/10 px-4 py-8 text-center text-[13px] text-text-color-3"
          >
            <span className="mr-1 text-2xl">📷</span>
            Drag & Drop your images or <span className="underline">Browse</span>
            <input
              type="file"
              onChange={handleFile}
              id="sub-category-image-upload"
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
          <span htmlFor="parent-category" className="add-product-label">
            Parent Category
          </span>
          <SelectBox
            id="parent-category"
            className="product-select-box"
            name="parentCategory"
            value={inputData.parentCategory}
            onChange={handleChange}
          >
            <SelectBoxOptions
              value={"select-parent-category"}
              label="Select Parent Category"
            />
            {categoryData &&
              categoryData.length > 0 &&
              categoryData.map((item, index) => (
                <SelectBoxOptions
                  key={item?._id ?? index}
                  value={item?._id}
                  label={item?.categoryName}
                />
              ))}
          </SelectBox>
        </div>

        {/* Category Description */}
        <div className="product-input-container">
          <label
            htmlFor="subcategory-description"
            className="add-product-label"
          >
            Category Description
          </label>

          <textarea
            id="subcategory-description"
            name="subcategoryDescription"
            onChange={handleChange}
            value={inputData.subcategoryDescription}
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
          <SubmitBtn
            label={inputData._id ? "Update Category" : "Add Category"}
            submitBtnLoader={submitBtnLoader}
          />
        </div>
      </form>
    </MainCardContainer>
  );
};
