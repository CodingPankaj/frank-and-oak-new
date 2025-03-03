import { Router } from "express";
import { verifyAdminJwt } from "../../middlewares/adminAuth.middleware.js";
import {
  addSize,
  deleteSize,
  getSize,
  updateSize,
} from "../../controllers/admin/size.controllers.js";

export const sizeRouter = Router();

// get sizes
sizeRouter.route("/view").get(getSize);

// add size
sizeRouter.route("/add").post(verifyAdminJwt, addSize);

// update size
sizeRouter.route("/update").patch(verifyAdminJwt, updateSize);

// delete size
sizeRouter.route("/delete/:id").delete(verifyAdminJwt, deleteSize);
