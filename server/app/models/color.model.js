import mongoose, { Schema } from "mongoose";

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
  },
  { timestamps: true }
);

export const Color = mongoose.model("Color", colorSchema);
