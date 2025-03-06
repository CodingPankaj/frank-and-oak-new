import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

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
    categorySlug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// generate slugs
categorySchema.pre("save", function (next) {
  if (!this.isModified("categoryName")) next();

  this.categorySlug = slugify(this.categoryName, { lower: true, strict: true });
  next();
});

export const Category = mongoose.model("Category", categorySchema);
