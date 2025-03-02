import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../controllers/admin/category.controllers.js";
import { verifyAdminJwt } from "../../middlewares/adminAuth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

export const categoryRouter = Router();

categoryRouter.route("/view").get(getCategory);

categoryRouter
  .route("/add")
  .post(verifyAdminJwt, upload.single("categoryImage"), addCategory);

categoryRouter
  .route("/update")
  .patch(verifyAdminJwt, upload.single("categoryImage"), updateCategory);

categoryRouter.route("/delete/:id").delete(verifyAdminJwt, deleteCategory);
