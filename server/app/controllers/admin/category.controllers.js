import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";
import { Category } from "../../models/category.model.js";

export const addCategory = asyncHandler(async (req, res) => {
  const { categoryName, categoryDescription, categoryStatus } = req.body;
  if (!categoryName || categoryName?.trim() === "") {
    throw new ApiError(400, "All fields are required");
  }

  const categoryImageLocalPath = req?.file?.path ?? null;

  if (!categoryImageLocalPath) {
    throw new ApiError(400, "Category Image is required");
  }

  const categoryImage = await uploadToCloudinary(categoryImageLocalPath);

  if (!categoryImage) {
    throw new ApiError(500, "Something went wrong while uploading image");
  }

  const category = await Category.create({
    categoryName,
    categoryDescription: categoryDescription ? categoryDescription?.trim() : "",
    categoryStatus,
    categoryImage: categoryImage.url,
  });

  if (!category) {
    throw new ApiError(500, "Something went wrong while creating category");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category added successfully"));
});

export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find();

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Categoy fetched successfully"));
});
