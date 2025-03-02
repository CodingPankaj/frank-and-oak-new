import { Color } from "../../models/color.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const addColor = asyncHandler(async (req, res) => {
  const { colorName, colorValue } = req.body;

  if (
    !colorName ||
    colorName?.trim() === "" ||
    !colorValue ||
    colorValue?.trim() === ""
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const color = await Color.create({ colorName, colorValue });

  return res
    .status(200)
    .json(new ApiResponse(200, color, "Color created successfull"));
});

export const getColor = asyncHandler(async (req, res) => {
  const color = await Color.find();

  return res
    .status(200)
    .json(new ApiResponse(200, color, "Size fetched successfully"));
});

export const deleteColor = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  if (!_id) {
    throw new ApiError(400, "Id is required");
  }

  const deletedColor = await Size.findByIdAndDelete({ _id });

  console.log(deletedColor);

  return res.status(200).json(200, {}, "Color deleted");
});
