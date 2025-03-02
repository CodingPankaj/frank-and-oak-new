import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { CLOUDINARY_BASE_URL } from "../constants.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload file to cloudinary
export const uploadToCloudinary = async (
  localFilePath,
  cloudinaryFolderName
) => {
  try {
    if (!localFilePath) return null;

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: `frankandoak/${cloudinaryFolderName ?? ""}`,
    });

    fs.unlinkSync(localFilePath);

    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

// delete file from cloudinary using public id
export const deleteFileFromCloudinary = async (imageUrl) => {
  const publicId = imageUrl.replace(CLOUDINARY_BASE_URL, "").split(".")[0];

  try {
    if (!publicId) return null;

    const deleteResult = await cloudinary.uploader.destroy(publicId);

    return deleteResult;
  } catch (error) {
    console.log("Delete failed", error);
    return null;
  }
};
