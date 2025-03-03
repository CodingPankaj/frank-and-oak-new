import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  deleteFileFromCloudinary,
  uploadToCloudinary,
} from "../../utils/cloudinary.js";
import { Category } from "../../models/category.model.js";

// get category
export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find();

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully"));
});

// add categoy
export const addCategory = asyncHandler(async (req, res) => {
  const { categoryName, categoryDescription, categoryStatus } = req.body;

  // category local path
  const categoryImageLocalPath = req?.file?.path ?? null;

  // check if category name is present
  if (!categoryName || categoryName?.trim() === "") {
    throw new ApiError(400, "Category name is required");
  }

  if (!categoryImageLocalPath) {
    throw new ApiError(400, "Category Image is required");
  }

  // upload image to cloudinary
  const categoryImage = await uploadToCloudinary(categoryImageLocalPath);

  if (!categoryImage) {
    throw new ApiError(500, "Something went wrong while uploading image");
  }

  // create new category
  const category = await Category.create({
    categoryName: categoryName.trim(),
    categoryDescription: categoryDescription ? categoryDescription?.trim() : "",
    categoryStatus,
    categoryImage: categoryImage.url,
  });

  if (!category) {
    throw new ApiError(500, "Something went wrong while creating category");
  }

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category added successfully"));
});

// update sub category
export const updateCategory = asyncHandler(async (req, res) => {
  const { _id, categoryName, categoryDescription, categoryStatus } = req.body;

  // category local path
  const categoryImageLocalPath = req?.file?.path ?? null;

  // check if id is available or not
  if (!_id) {
    throw new ApiError(400, "Id is required");
  }

  // check if all the fields are not available
  if (
    !categoryName &&
    !categoryDescription &&
    !categoryStatus &&
    !categoryImageLocalPath
  ) {
    throw new ApiError(400, "Make changes to update");
  }

  // make object of fields to update
  const fieldsToUpdate = {};

  // check and select fields that are not empty
  if (categoryName) {
    fieldsToUpdate.categoryName = categoryName;
  }

  if (categoryDescription) {
    fieldsToUpdate.categoryDescription = categoryDescription;
  }

  if (categoryStatus) {
    fieldsToUpdate.categoryStatus = categoryStatus;
  }

  // check if id exists in database
  const category = await Category.findById(_id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // if id exists in database then upload the image to cloud
  if (categoryImageLocalPath) {
    // upload image to cloudinary

    const categoryImage = await uploadToCloudinary(categoryImageLocalPath);

    if (!categoryImage) {
      throw new ApiError(500, "Something went wrong while uploading image");
    }

    fieldsToUpdate.categoryImage = categoryImage.url;
  }

  // update category
  const updatedCategory = await Category.findByIdAndUpdate(
    _id,
    fieldsToUpdate,
    { new: true }
  );

  if (!updatedCategory) {
    throw new ApiError(500, "Something went wrong while updating category");
  }

  // delete old image once category is updated
  if (categoryImageLocalPath) {
    // delete old image from cloudinary
    const deletedCategoryOldImage = await deleteFileFromCloudinary(
      category.categoryImage
    );

    if (!deletedCategoryOldImage) {
      throw new ApiError(500, "Something went wrong while deleting old image");
    }
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updated successfully")
    );
});

// delete category
export const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new ApiError(400, "Id is required for deleting category");
  }

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Categoy not found");
  }

  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new ApiError(500, "Something went wrong while deleting category");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "", "Category deleted successfully"));
});
