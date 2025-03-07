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
      index: true,
    },
  },
  { timestamps: true }
);

// generate slugs
colorSchema.pre("save", async function (next) {
  if (!this.isModified("colorName")) next();

  let baseSlug = slugify(this.colorName, { lower: true, strict: true });

  let newSlug = baseSlug;
  let counter = 1;

  while (await this.constructor.exists({ colorSlug: newSlug })) {
    newSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.colorSlug = newSlug;

  next();
});

export const Color = mongoose.model("Color", colorSchema);
