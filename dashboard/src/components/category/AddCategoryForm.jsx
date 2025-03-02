import { useEffect, useState } from "react";
import { CardTop } from "../CardTop";
import { LinkBtnTwo } from "../LinkBtnTwo";
import { MainCardContainer } from "../MainCardCointainer";
import { SelectBox } from "../SelectBox";
import { SelectBoxOptions } from "../SelectBoxOptions";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { RadioStatusButton } from "../RadioStatusButton";

export const AddCategoryForm = ({ getCategory, categoryData }) => {
  const [radioBtnStatus, setRadioBtnStatus] = useState(true);
  const [categoryImage, setCategoryImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [inputData, setInputData] = useState({
    categoryName: "",
    categoryDescription: "",
    categoryType: "parent-category",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInputData = { ...inputData };
    newInputData[name] = value;
    setInputData(newInputData);
  };

  // handle file
  const handleFile = (e) => {
    setCategoryImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", inputData.categoryName);
    formData.append("categoryDescription", inputData.categoryDescription);
    formData.append("categoryStatus", radioBtnStatus);
    formData.append("categoryImage", categoryImage);

    const apiEndpoint =
      inputData.categoryType === "parent-category" ||
      inputData.categoryType === ""
        ? "admin/category/add"
        : "admin/subcategory/add";

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${apiEndpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "'multipart/form-data'",
          },
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        toast.success("New Category Added");
      }

      getCategory();
    } catch (error) {
      toast.error("Failed to add product");
      console.log(error);
    }
  };
  return (
    <MainCardContainer>
      <CardTop heading="Add Category" headingStyle="text-sm" />
      <form onSubmit={handleSubmit} className="pb-10">
        {/* Category Name Input */}
        <div className="pb-3 pt-2">
          <div className="product-input-container">
            <label htmlFor="category-name" className="add-product-label">
              Category Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={inputData.categoryName}
              id="category-name"
              name="categoryName"
              placeholder="Enter Category Name"
              className="product-input"
            />
          </div>
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
          <label htmlFor="category-type" className="add-product-label">
            Type
          </label>
          <SelectBox
            id="category-type"
            className="product-select-box"
            name="categoryType"
            onChange={handleChange}
          >
            <SelectBoxOptions value="parent-category" label="Parent Category" />
            {categoryData &&
              categoryData.length > 0 &&
              categoryData.map((item, index) => (
                <SelectBoxOptions
                  key={item._id ?? index}
                  value={item.categoryName}
                  label={item.categoryName}
                />
              ))}
            {/* <SelectBoxOptions value="mens-clothing" label="Mens Clothing" />
            <SelectBoxOptions value="womens-clothing" label="Womens Clothing" />
            <SelectBoxOptions value="footwear" label="Footwear" /> */}
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
          <button className="primary-btn">Publish</button>
        </div>
      </form>
      <ToastContainer />
    </MainCardContainer>
  );
};
