import mongoose, { Schema } from "mongoose";

const sizeSchema = new Schema(
  {
    sizeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Size = mongoose.model("Size", sizeSchema);
