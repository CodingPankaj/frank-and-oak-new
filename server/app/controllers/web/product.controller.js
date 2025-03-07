import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { Product } from "../../models/product.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getProducts = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  let products;

  // if slug is provided by user
  if (slug) {
    products = await Product.findOne({ productSlug: slug })
      .populate("productParentCategory")
      .populate("productSubcategory")
      .populate("productSizes")
      .populate("productColors");

    // if no product is found
    if (!products) {
      throw new ApiError(404, "Product not found");
    }
  } else {
    // If slug is not provided then fetch all products
    products = await Product.find()
      .populate("productParentCategory")
      .populate("productSubcategory")
      .populate("productSizes")
      .populate("productColors");
  }

  // Return response
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});
