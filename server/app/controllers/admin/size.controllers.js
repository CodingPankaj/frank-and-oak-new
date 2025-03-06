import { Size } from "../../models/size.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// get all size
export const getSize = asyncHandler(async (req, res) => {
  const size = await Size.find();

  return res
    .status(200)
    .json(new ApiResponse(200, size, "Size fetched successfully"));
});

// add size
export const addSize = asyncHandler(async (req, res) => {
  const { sizeName, sizeStatus } = req.body;

  if (!sizeName || sizeName?.trim() === "") {
    throw new ApiError(400, "Size name is required");
  }

  if (!typeof sizeStatus === Boolean) {
    throw new ApiError(400, "Size status must be boolean value");
  }

  const size = await Size.create({
    sizeName: sizeName.trim(),
    sizeStatus,
  });

  if (!size) {
    throw new ApiError(500, "Something went wrong while creating new size");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, size, "Size created successfull"));
});

// update size
export const updateSize = asyncHandler(async (req, res) => {
  const { sizeName, sizeStatus, _id } = req.body;

  // check if id is available
  if (!_id) {
    throw new ApiError(401, "Id is required");
  }

  // check if id is valid
  const size = await Size.findById(_id);

  if (!size) {
    throw new ApiError(404, "Size not found");
  }

  // check if any changes are made or not
  if (
    (!sizeName || sizeName?.trim() === "") &&
    sizeStatus === size.sizeStatus
  ) {
    throw new ApiError(400, "Make changes to update size");
  }

  // update size
  const updatedSize = await Size.findByIdAndUpdate(
    _id,
    {
      $set: {
        sizeName: sizeName.trim(),
        sizeStatus,
      },
    },
    { new: true }
  );

  if (!updateSize) {
    throw new ApiError(500, "Something went wrong while updating size");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedSize, "Size updated successfully"));
});

// delete size
export const deleteSize = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new ApiError(400, "Id is required");
  }

  const deletedSize = await Size.findByIdAndDelete(id);

  if (!deletedSize) {
    throw new ApiError(404, "Size not found");
  }

  return res.status(200).json(200, "", "Size deleted");
});
