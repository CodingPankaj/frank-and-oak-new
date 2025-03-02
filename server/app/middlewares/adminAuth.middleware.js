import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyAdminJwt = asyncHandler(async (req, res, next) => {
  // check for access token
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized access");
  }

  // decode access token
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken) {
    throw new ApiError(401, "Invalid access token");
  }

  // find user from decoded token
  const user = await Admin.findById(decodedToken._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  // adding user to req object
  req.user = user;
  next();
});
