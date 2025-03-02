import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateAccountPasswword,
  updateAccountDetails,
} from "../../controllers/web/user.controllers.js";

export const userRouter = Router();

// routes
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

// secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/update-password").post(verifyJWT, updateAccountPasswword);
userRouter.route("/update-account").patch(verifyJWT, updateAccountDetails);
userRouter.route("/refresh-token").post(refreshAccessToken);
