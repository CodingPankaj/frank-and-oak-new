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
      index: true,
    },
  },
  { timestamps: true }
);

// generate slugs
categorySchema.pre("save", async function (next) {
  if (!this.isModified("categoryName")) next();

  let baseSlug = slugify(this.categoryName, { lower: true, strict: true });
  let newSlug = baseSlug;
  let counter = 1;

  while (await this.constructor.exists({ categorySlug: newSlug })) {
    newSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.categorySlug == newSlug;
  next();
});

export const Category = mongoose.model("Category", categorySchema);
