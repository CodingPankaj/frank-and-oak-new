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
      index: true,
    },
  },
  { timestamps: true }
);

// generate slugs
subcategorySchema.pre("save", async function (next) {
  if (!this.isModified("subcategoryName")) next();

  let baseSlug = slugify(this.subcategoryName, { lower: true, strict: true });

  let newSlug = baseSlug;
  let counter = 1;

  while (await this.constructor.exists({ subcategorySlug: newSlug })) {
    newSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.subcategorySlug = newSlug;
  next();
});

export const Subcategory = mongoose.model("Subcategory", subcategorySchema);
