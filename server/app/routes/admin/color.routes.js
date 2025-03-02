import { Router } from "express";
import { verifyAdminJwt } from "../../middlewares/adminAuth.middleware.js";
import {
  addColor,
  deleteColor,
  getColor,
} from "../../controllers/admin/color.controllers.js";

export const colorRouter = Router();

colorRouter.route("/view").get(getColor);

colorRouter.route("/add").post(verifyAdminJwt, addColor);

colorRouter.route("/delete/:id").delete(verifyAdminJwt, deleteColor);
