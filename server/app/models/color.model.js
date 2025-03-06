import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const colorSchema = new Schema(
  {
    colorName: {
      type: String,
      required: true,
    },
    colorValue: {
      type: String,
      required: true,
    },
    colorStatus: {
      type: Boolean,
      default: true,
    },
    colorSlug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// generate slugs
colorSchema.pre("save", function (next) {
  if (!this.isModified("colorName")) next();

  this.colorSlug = slugify(this.colorName, { lower: true, strict: true });
  next();
});

export const Color = mongoose.model("Color", colorSchema);
