import { Size } from "../../models/size.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const addSize = asyncHandler(async (req, res) => {
  const { sizeName, sizeStatus } = req.body;

  if (!sizeName || sizeName?.trim() === "") {
    throw new ApiError(400, "All fields are required");
  }

  const size = await Size.create({ sizeName, sizeStatus });

  return res
    .status(200)
    .json(new ApiResponse(200, size, "Size created successfull"));
});

export const getSize = asyncHandler(async (req, res) => {
  const size = await Size.find();

  return res
    .status(200)
    .json(new ApiResponse(200, size, "Size fetched successfully"));
});

export const deleteSize = asyncHandler(async (req, res) => {
  console.log(req.params);

  const _id = req.params.id;
  if (!_id) {
    throw new ApiError(400, "Id is required");
  }

  console.log(_id);

  const deletedSize = await Size.findByIdAndDelete({ _id });

  console.log(deletedSize);

  return res.status(200).json(200, {}, "Size deleted");
});
