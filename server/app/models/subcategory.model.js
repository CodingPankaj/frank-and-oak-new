import mongoose, { Schema } from "mongoose";

const subcategorySchema = new Schema(
  {
    subcategoryName: {
      type: String,
      required: true,
    },
    subcategoryDescription: {
      type: String,
    },
    subcategoryStatus: {
      type: Boolean,
      default: true,
    },
    subcategoryImage: {
      type: String,
      required: true,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export const Subcategory = mongoose.model("Subcategory", subcategorySchema);
