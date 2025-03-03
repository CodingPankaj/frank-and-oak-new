import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  adminRegister,
  getCurrentAdmin,
} from "../../controllers/admin/adminuser.controllers.js";
import { verifyAdminJwt } from "../../middlewares/adminAuth.middleware.js";

export const adminUserRouter = Router();

// register
adminUserRouter.route("/register").post(adminRegister);

// login
adminUserRouter.route("/login").post(adminLogin);

// secured routes
adminUserRouter.route("/auth").get(verifyAdminJwt, getCurrentAdmin);

// logout
adminUserRouter.route("/logout").get(verifyAdminJwt, adminLogout);
