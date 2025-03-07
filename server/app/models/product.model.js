import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productImages: {
      type: [String],
      // required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productSalePrice: {
      type: Number,
    },
    productParentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    productSubcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    productSizes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Size",
        },
      ],
      // required: true,
    },
    productColors: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Color",
        },
      ],
      // required: true,
    },
    productSlug: {
      type: String,
      unique: true,
      index: true,
    },
    productStatus: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// generate slugs
productSchema.pre("save", async function (next) {
  if (!this.isModified("sizeName")) next();

  let baseSlug = slugify(this.productName, { lower: true, strict: true });
  let newSlug = baseSlug;
  let counter = 1;

  while (await this.constructor.exists({ productSlug: newSlug })) {
    newSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.productSlug = newSlug;
  next();
});

export const Product = mongoose.model("Product", productSchema);
