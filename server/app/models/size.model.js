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
      index: true,
    },
  },
  { timestamps: true }
);

// generate a unique slug
sizeSchema.pre("save", async function (next) {
  if (!this.isModified("categoryName")) return next();

  // create base url with whatever name in received from input
  let baseSlug = slugify(this.sizeName, { lower: true, strict: true });

  // newSlug will hold the modified slug while checking on loop
  let newSlug = baseSlug;
  let counter = 1;

  // check if slug already exists in db
  while (await this.constructor.exists({ sizeSlug: newSlug })) {
    // if the condition if true then it will modify the newSlug by adding counter at the end of the slug
    newSlug = `${newSlug}-${counter}`;
    counter++;
  }

  // add unique slug
  this.sizeSlug = newSlug;

  next();
});

export const Size = mongoose.model("Size", sizeSchema);
