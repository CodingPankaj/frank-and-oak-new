import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  deleteFileFromCloudinary,
  uploadToCloudinary,
} from "../../utils/cloudinary.js";
import { Subcategory } from "../../models/subcategory.model.js";
import { Category } from "../../models/category.model.js";

// get sub category
export const getSubcategory = asyncHandler(async (req, res) => {
  // check if parent id is present
  const subcategory = await Subcategory.find().populate(
    "parentCategory",
    "categoryName"
  );

  if (!subcategory) {
    throw new ApiError(404, "Sub category not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, subcategory, "Sub category fetched successfully")
    );
});

// add sub category
export const addSubcategory = asyncHandler(async (req, res) => {
  const {
    subcategoryName,
    subcategoryDescription,
    subcategoryStatus,
    parentCategory,
  } = req.body;

  // sub category local path
  const subcategoryImageLocalPath = req?.file?.path ?? null;

  // check if sun category name is present
  if (!subcategoryName || subcategoryName?.trim() === "") {
    throw new ApiError(400, "Sub category name is required");
  }

  // check if sub category local image path is not present
  if (!subcategoryImageLocalPath) {
    throw new ApiError(400, "Sub category Image is required");
  }

  // check if parent  category is not present
  if (!parentCategory) {
    throw new ApiError(400, "Parent category is required");
  }

  const isParentCategory = await Category.findById(parentCategory);

  if (!isParentCategory) {
    throw new ApiError(
      404,
      "Parent category not found, add parent category before crating sub category"
    );
  }

  let subcategoryImage = null;

  try {
    // upload image to cloudinary
    subcategoryImage = await uploadToCloudinary(subcategoryImageLocalPath);

    if (!subcategoryImage) {
      throw new ApiError(500, "Something went wrong while uploading image");
    }

    // create new sub category
    const subcategory = await Subcategory.create({
      subcategoryName: subcategoryName.trim(),
      subcategoryDescription: subcategoryDescription
        ? subcategoryDescription.trim()
        : "",
      subcategoryStatus,
      subcategoryImage: subcategoryImage.secure_url,
      parentCategory,
    });

    if (!subcategory) {
      throw new ApiError(
        500,
        "Something went wrong while creating sub category"
      );
    }

    // return response
    return res
      .status(200)
      .json(
        new ApiResponse(200, subcategory, "Subcategory added successfully")
      );
  } catch (error) {
    if (subcategoryImage?.secure_url) {
      await deleteFileFromCloudinary(subcategoryImage.secure_url);
    }

    // re throw errors to async handler
    throw error;
  }
});

// update sub category
export const updateSubcategory = asyncHandler(async (req, res) => {
  const {
    _id,
    subcategoryName,
    subcategoryDescription,
    subcategoryStatus,
    parentCategory,
  } = req.body;

  // sub category image local path
  const subcategoryImageLocalPath = req?.file?.path ?? null;

  // check if id is available or not
  if (!_id) {
    throw new ApiError(400, "Id is required");
  }

  // check if id exists in database
  const subcategory = await Subcategory.findById(_id);
  if (!subcategory) {
    throw new ApiError(404, "Sub category not found");
  }

  const isAllFieldsEmpty =
    !subcategoryName &&
    !subcategoryDescription &&
    !subcategoryStatus &&
    !subcategoryImageLocalPath;

  // check if all the fields are not available
  if (isAllFieldsEmpty && subcategory.parentCategory === parentCategory) {
    throw new ApiError(400, "Make changes to update");
  }

  // make object of fields to update
  const fieldsToUpdate = {};

  // check and select fields that are not empty
  if (subcategoryName) {
    fieldsToUpdate.subcategoryName = subcategoryName;
  }

  if (subcategoryDescription) {
    fieldsToUpdate.subcategoryDescription = subcategoryDescription;
  }

  if (subcategoryStatus) {
    fieldsToUpdate.subcategoryStatus = subcategoryStatus;
  }
  if (parentCategory) {
    fieldsToUpdate.parentCategory = parentCategory;
  }
  if (parentCategory) {
    fieldsToUpdate.parentCategory = parentCategory;
  }

  // if id exists in database then upload the image to cloud
  if (subcategoryImageLocalPath) {
    // upload image to cloudinary
    const subcategoryImage = await uploadToCloudinary(
      subcategoryImageLocalPath
    );

    if (!subcategoryImage) {
      throw new ApiError(500, "Something went wrong while uploading image");
    }

    fieldsToUpdate.subcategoryImage = subcategoryImage.secure_url;
  }

  // update sub category
  const updatedSubcategory = await Subcategory.findByIdAndUpdate(
    _id,
    fieldsToUpdate,
    { new: true }
  );

  if (!updatedSubcategory) {
    throw new ApiError(500, "Something went wrong while updating sub category");
  }

  // delete old image once sub category is updated
  if (subcategoryImageLocalPath) {
    // delete old image from cloudinary
    const deletedCategoryOldImage = await deleteFileFromCloudinary(
      subcategory.subcategoryImage
    );

    if (!deletedCategoryOldImage) {
      throw new ApiError(500, "Something went wrong while deleting old image");
    }
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedSubcategory,
        "Sub category updated successfully"
      )
    );
});

// delete sub category
export const deleteSubcategory = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new ApiError(400, "Id is required for deleting sub category");
  }

  // find sub category by id
  const subcategory = await Subcategory.findById(id);

  if (!subcategory) {
    throw new ApiError(404, "Sub categoy not found");
  }

  // delete image
  const deleteImage = await deleteFileFromCloudinary(
    subcategory.subcategoryImage
  );

  if (deleteImage.result === "not found") {
    throw new ApiError(404, "Image not found");
  }

  // delete category

  const deletedSubcategory = await Subcategory.findByIdAndDelete(id);

  if (!deletedSubcategory) {
    throw new ApiError(500, "Something went wrong while deleting sub category");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "", "Sub category deleted successfully"));
});
