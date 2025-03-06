import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import { Subcategory } from "../../models/subcategory.model.js";
import {
  delteMultipleFileFromCloudinary,
  uploadMultipleImageToCloudinary,
} from "../../utils/cloudinary.js";

export const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("productColors", "colorValue colorName")
    .populate("productSizes", "sizeName")
    .populate("productParentCategory", "categoryName")
    .populate("productSubcategory", "subcategoryName");

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

export const addProduct = asyncHandler(async (req, res) => {
  const {
    productName,
    productDescription,
    productShortDescription,
    productPrice,
    productSalePrice,
    productParentCategory,
    productSubcategory,
    productSizes,
    productColors,
  } = req.body;

  const newProductPrice = Number(productPrice);
  const newProductSalePrice = Number(productSalePrice);

  // check for product name
  if (!productName || productName.trim() === "") {
    throw new ApiError(400, "Product name is required");
  }

  // check for product price
  if (!newProductPrice) {
    throw new ApiError(400, "Product price is required");
  }

  // check for product sale price
  if (newProductPrice && newProductPrice > productPrice) {
    throw new ApiError(
      400,
      "Product sale price cannot be higher than product price"
    );
  }

  // check for product parent category
  if (!productParentCategory) {
    throw new ApiError(400, "Parent category is required");
  }

  // check for parent category
  const parentCat = await Category.findById(productParentCategory);

  if (!parentCat) {
    throw new ApiError(401, "Invalid parent category");
  }

  // check for product sub category
  if (!productSubcategory) {
    throw new ApiError(400, "Sub category is required");
  }

  const subCat = await Subcategory.findById(productSubcategory);

  if (!subCat) {
    throw new ApiError(401, "Invalid Sub category");
  }

  // product sizes

  // product files
  const productFiles = req.files?.productImages;
  console.log(productFiles);
  const productImageLocalFilePath = productFiles.map((file) => file.path);
  let productImages;

  console.log("line 85");

  try {
    // upload images to cloudinary
    productImages = await uploadMultipleImageToCloudinary(
      productImageLocalFilePath
    );

    if (!productImages || productImages.length === 0) {
      throw new ApiError(400, "Product images are required");
    }

    // create product
    const product = await Product.create({
      productName: productName.trim(),
      productDescription: productDescription.trim() ?? "",
      productShortDescription: productShortDescription.trim() ?? "",
      productPrice: newProductPrice,
      productSalePrice: newProductSalePrice ?? newProductPrice,
      productParentCategory,
      productSubcategory,
      productSizes,
      productColors,
      productImages,
    });

    console.log(product);

    if (!product) {
      throw new ApiError(400, "Something went wrong while creating product");
    }

    // return res
    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product created successfully"));
  } catch (error) {
    const deleteres = await delteMultipleFileFromCloudinary(productImages);

    throw error;
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new ApiError(400, "Id is required for deleting product");
  }

  // find sub category by id
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // delete image
  const deleteImages = await delteMultipleFileFromCloudinary(
    product.productImages
  );

  if (deleteImages.result === "not found") {
    throw new ApiError(404, "Image not found");
  }

  // delete category

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new ApiError(500, "Something went wrong while deleting product");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "", "Product deleted successfully"));
});
