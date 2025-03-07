import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

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
    subcategorySlug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// generate slugs
subcategorySchema.pre("save", function (next) {
  if (!this.isModified("sizeName")) next();

  this.subcategorySlug = slugify(this.subcategoryName, {
    lower: true,
    strict: true,
  });
  next();
});

////
export const Subcategory = mongoose.model("Subcategory", subcategorySchema);
