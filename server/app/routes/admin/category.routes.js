import { Router } from "express";
import {
  addCategory,
  getCategory,
} from "../../controllers/admin/category.controllers.js";
import { verifyAdminJwt } from "../../middlewares/adminAuth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

export const categoryRouter = Router();

categoryRouter
  .route("/add")
  .post(verifyAdminJwt, upload.single("categoryImage"), addCategory);

categoryRouter.route("/view").get(getCategory);
