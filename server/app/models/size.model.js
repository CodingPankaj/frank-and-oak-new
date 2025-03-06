import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const sizeSchema = new Schema(
  {
    sizeName: {
      type: String,
      required: true,
    },
    sizeStatus: {
      type: Boolean,
      default: true,
    },
    sizeSlug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// generate slugs
sizeSchema.pre("save", function (next) {
  if (!this.isModified("sizeName")) next();

  this.sizeSlug = slugify(this.sizeName, { lower: true, strict: true });
  next();
});

export const Size = mongoose.model("Size", sizeSchema);
