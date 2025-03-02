import { Router } from "express";
import { verifyAdminJwt } from "../../middlewares/adminAuth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import {
  addSize,
  deleteSize,
  getSize,
} from "../../controllers/admin/size.controllers.js";

export const sizeRouter = Router();

sizeRouter.route("/view").get(getSize);

sizeRouter
  .route("/add")
  .post(verifyAdminJwt, upload.single("categoryImage"), addSize);

sizeRouter.route("/delete/:id").delete(verifyAdminJwt, deleteSize);
