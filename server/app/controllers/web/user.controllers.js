import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiSuccess.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { cookieOptions } from "../../constants.js";
import jwt from "jsonwebtoken";

// generate access and refresh token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    // check for empty user id
    if (!userId) {
      throw new Error(
        400,
        "User Id is required to generate access and refresh token "
      );
    }

    // find user by id
    const user = await User.findById(userId);

    //generate access token and refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // save refresh token in data base
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    // return access and refresh token
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token",
      error?.message
    );
  }
};

// register new user
export const registerUser = asyncHandler(async (req, res) => {
  // check all fields and present fields are not blank
  const { email, firstName, lastName, password, shopFor } = req.body;

  const emptyField = [email, firstName, lastName, password].some(
    (field) => field?.trim() === "" || field === undefined
  );

  if (emptyField) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user with email already exists
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User with email already exists");
  }

  // create new user
  const user = await User.create({
    email,
    firstName,
    lastName,
    password,
    shopFor,
  });

  if (!user) {
    throw new ApiError(500, "Something went wrong while creating new user");
  }

  // copying user to new variable and deleteing password key and value
  const newUser = { ...user._doc };

  delete newUser.password;

  // send response
  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "User registered successfully"));
});

// login user
export const loginUser = asyncHandler(async (req, res) => {
  // check all fields and present fields are not blank
  const { email, password } = req.body;

  if (!email || !password || email.trim() === "" || password.trim() === "") {
    throw new ApiError(400, "Email and Password is required");
  }

  // check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, `User with email: ${email} not found`);
  }

  // check if password is correct
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 60000 })
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, {}, "User logged In Successfully"));
});

// logout user
export const logoutUser = asyncHandler(async (req, res) => {
  const logoutUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out"));
});

// resfresh access token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  // check for incomming refresh token
  const incommingRefereshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incommingRefereshToken) {
    throw new ApiError(401, "Unauthorized Access");
  }

  // decode refresh token
  const decodedToken = jwt.verify(
    incommingRefereshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  // find user by decoded token
  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }

  // match if incomming refresh token and refresh token saved in db is same
  if (incommingRefereshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh Token is Expired");
  }

  // generate new access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, {}, "Access token refreshed"));
});

// update account password
export const updateAccountPasswword = asyncHandler(async (req, res) => {
  // check all fields and present fields are not blank
  const { oldPassword, newPassword } = req.body;

  if (
    !oldPassword ||
    !newPassword ||
    oldPassword.trim() === "" ||
    newPassword.trim() === ""
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // find user and match old password with the old password saved in db
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old password");
  }

  // update user password and save to db
  user.password = newPassword;

  const updatedUser = await user.save({ validateBeforeSave: true });

  if (!updatedUser) {
    throw new ApiError(500, "Something went wrong while updating the password");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

// update account details
export const updateAccountDetails = asyncHandler(async (req, res) => {
  // check all fields and present fields are not blank
  const { firstName, lastName, email } = req.body;

  if (
    firstName.trim() === "" &&
    lastName.trim() === "" &&
    email.trim() === ""
  ) {
    throw new ApiError(400, "Enter details to update");
  }

  // find user and match old password with the old password saved in db
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // update user account and save to db
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  const updatedUser = await user
    .save({ validateBeforeSave: true })
    .select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(500, "Something went wrong while updating the password");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Account updated successfully"));
});

// get current user
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});
