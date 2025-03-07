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

// delete single file from cloudinary using public id
export const deleteFileFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return null;

  try {
    const publicId = imageUrl
      .replace(CLOUDINARY_BASE_URL, "")
      .split("/")
      .slice(1)
      .join("/")
      .split(".")[0];

    const deleteResult = await cloudinary.uploader.destroy(publicId);

    return deleteResult;
  } catch (error) {
    console.log("Delete failed", error);
    return null;
  }
};

// upload multiple file to cloudinary
export const uploadMultipleImageToCloudinary = async (
  localFilePathArray,
  cloudinaryFolderName
) => {
  if (!localFilePathArray || localFilePathArray.length === 0) return [];

  const imageUrls = [];
  try {
    for (const localFilePath of localFilePathArray) {
      if (!localFilePath) {
        imageUrls.push(null);
        continue;
      }

      try {
        const res = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto",
          folder: `frankandoak/${cloudinaryFolderName ?? ""}`,
        });

        imageUrls.push(res.secure_url);
        fs.unlinkSync(localFilePath);
      } catch (error) {
        console.error(`Error uploading file ${localFilePath}:`, error);
        imageUrls.push(null);
        fs.unlinkSync(localFilePath);
      }
    }

    return imageUrls;
  } catch (error) {
    console.log("Some thing went wrong while uploading file", error);
    return [];
  }
};

// delete multiple file from cloudinary

export const delteMultipleFileFromCloudinary = async (imageUrlsArray) => {
  if (!imageUrlsArray || imageUrlsArray.length === 0) return [];

  const deleteResult = [];

  try {
    for (const imageUrl of imageUrlsArray) {
      if (!imageUrl) return null;

      const publicId = imageUrl
        .replace(CLOUDINARY_BASE_URL, "")
        .split("/")
        .slice(1)
        .join("/")
        .split(".")[0];

      // console.log(publicId);

      try {
        const res = await cloudinary.uploader.destroy(publicId);

        deleteResult.push(res);
      } catch (error) {
        console.log(`Error uploading file ${localFilePath}:`, error);
        deleteResult.push(null);
      }
    }

    return deleteResult;
  } catch (error) {
    console.log("Some thing went wrong while deleting file", error);
    return [];
  }
};
