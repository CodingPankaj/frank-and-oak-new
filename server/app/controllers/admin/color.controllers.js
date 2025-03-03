import { Color } from "../../models/color.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// get color
export const getColor = asyncHandler(async (req, res) => {
  const color = await Color.find();

  return res
    .status(200)
    .json(new ApiResponse(200, color, "Size fetched successfully"));
});

// add color
export const addColor = asyncHandler(async (req, res) => {
  const { colorName, colorValue, colorStatus } = req.body;

  // check if color name and color value is present
  if (
    !colorName ||
    colorName?.trim() === "" ||
    !colorValue ||
    colorValue?.trim() === ""
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check if colorStatus is boolean or not
  if (!typeof colorStatus === Boolean) {
    throw new ApiError(400, "Color status must be boolean value");
  }

  // create new color
  const color = await Color.create({ colorName, colorValue, colorStatus });

  if (!color) {
    throw new ApiError(500, "Something went wrong while creating color");
  }

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, color, "Color created successfull"));
});

// update color
export const updateColor = asyncHandler(async (req, res) => {
  const { _id, colorName, colorValue, colorStatus } = req.body;

  // check if id is available
  if (!_id) {
    throw new ApiError(401, "Id is required");
  }

  // check if id is valid
  const color = await Color.findById(_id);

  if (!color) {
    throw new ApiError(404, "Color not found");
  }

  // check if any changes are made or not
  if (
    (!colorName || colorName?.trim() === "") &&
    (!colorValue || colorValue?.trim() === "") &&
    colorStatus === color.colorStatus
  ) {
    throw new ApiError(400, "Make changes to update size");
  }

  // update color
  const updatedColor = await Color.findByIdAndUpdate(
    _id,
    {
      $set: { colorName, colorValue, colorStatus },
    },
    { new: true }
  );

  if (!updateColor) {
    throw new ApiError(500, "Something went wrong while updating color");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedColor, "Color updated successfully"));
});

// delete color
export const deleteColor = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  // check if id is present
  if (!_id) {
    throw new ApiError(400, "Id is required");
  }

  const deletedColor = await Color.findByIdAndDelete({ _id });

  if (!deletedColor) {
    throw new ApiError(404, "Color not found");
  }

  return res.status(200).json(200, {}, "Color deleted");
});
