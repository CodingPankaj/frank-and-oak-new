import { Size } from "../../models/size.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// add and update size
export const addSize = asyncHandler(async (req, res) => {
  const { sizeName, sizeStatus, _id } = req.body;

  if (!sizeName || sizeName?.trim() === "") {
    throw new ApiError(400, "All fields are required");
  }

  // check if id is available
  if (_id) {
    const size = await Size.findByIdAndUpdate(_id, {
      $set: { sizeName },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, size, "Size created successfull"));
  }

  const size = await Size.create({ sizeName, sizeStatus });

  if (!size) {
    throw new ApiError(500, "Something went wrong while creating new size");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, size, "Size created successfull"));
});

// get all size
export const getSize = asyncHandler(async (req, res) => {
  const size = await Size.find();

  return res
    .status(200)
    .json(new ApiResponse(200, size, "Size fetched successfully"));
});

// delete size
export const deleteSize = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new ApiError(400, "Id is required");
  }

  const deletedSize = await Size.findByIdAndDelete({ id });

  if (!deletedSize) {
    throw new ApiError(401, "Invalid Size Id");
  }

  return res.status(200).json(200, {}, "Size deleted");
});
