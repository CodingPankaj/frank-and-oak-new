import { Router } from "express";
import {
  adminLogin,
  adminRegister,
  getCurrentAdmin,
} from "../../controllers/admin/adminuser.controllers.js";
import { verifyAdminJwt } from "../../middlewares/adminAuth.middleware.js";

export const adminUserRouter = Router();

adminUserRouter.route("/register").post(adminRegister);

adminUserRouter.route("/login").post(adminLogin);

// secured routes
adminUserRouter.route("/auth").get(verifyAdminJwt, getCurrentAdmin);
