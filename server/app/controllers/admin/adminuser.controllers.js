import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Admin } from "../../models/admin.model.js";
import { cookieOptions } from "../../constants.js";

// generate access token and refresh token
const generateAccessAndRefreshToken = async (adminId) => {
  try {
    // check for empty admin id
    if (!adminId) {
      throw new Error(
        400,
        "User Id is required to generate access and refresh token "
      );
    }

    // find admin
    const admin = await Admin.findById(adminId);

    // generate access and refresh token
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    // save refresh token in db
    admin.refreshToken = refreshToken;

    await admin.save({ validateBeforeSave: false });

    // return access token and refresh token
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

// register user
export const adminRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const emptyField = [username, email, password].some(
    (field) => field?.trim() === "" || !field
  );

  if (emptyField) {
    throw new ApiError(400, "All fields are required");
  }

  // check is existed user
  const existedAdmin = await Admin.findOne({ email });

  if (existedAdmin) {
    throw new ApiError(400, "User with email already exists");
  }

  // create new user
  const admin = await Admin.create({
    username,
    email,
    password,
  });

  if (!admin) {
    throw new ApiError(500, "Something went wrong while creating new user");
  }

  // copying user to new variable and deleteing password key and value
  const newAdmin = { ...admin._doc };

  delete newAdmin.password;

  return res
    .status(200)
    .json(new ApiResponse(200, newAdmin, "User registered successfully"));
});

// login user
export const adminLogin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // check is username or email address is present
  if (
    (!username || username?.trim() === "") &&
    (!email || email?.trim() === "")
  ) {
    throw new ApiError(400, "Username or email address is required");
  }

  // check if password is present
  if (!password || password?.trim() === "") {
    throw new ApiError(400, "Password is required");
  }

  // find admin in db
  const admin = await Admin.findOne({
    $or: [{ username }, { email }],
  });

  if (!admin) {
    throw new ApiError(404, "User not found");
  }

  //   check if password is correct
  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // generate access token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    admin._id
  );

  if (!accessToken || !refreshToken) {
    throw new ApiError(
      400,
      "Something went wrong while generating access refresh token"
    );
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, {}, "User loggedin successfully"));
});

// get current user
export const getCurrentAdmin = asyncHandler(async (req, res) => {
  const user = req.user;

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

// logout user
export const adminLogout = asyncHandler(async (req, res) => {
  const logoutAdmin = await Admin.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, "", "User logout successfully"));
});
