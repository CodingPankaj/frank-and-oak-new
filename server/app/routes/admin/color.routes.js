import { Router } from "express";
import { verifyAdminJwt } from "../../middlewares/adminAuth.middleware.js";
import {
  addColor,
  deleteColor,
  getColor,
  updateColor,
} from "../../controllers/admin/color.controllers.js";

export const colorRouter = Router();

// get color
colorRouter.route("/view").get(getColor);

// add color
colorRouter.route("/add").post(verifyAdminJwt, addColor);

// update color
colorRouter.route("/update").patch(verifyAdminJwt, updateColor);

// delete color
colorRouter.route("/delete/:id").delete(verifyAdminJwt, deleteColor);
