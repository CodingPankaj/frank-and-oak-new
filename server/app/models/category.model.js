import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
    },
    categoryStatus: {
      type: Boolean,
      default: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
