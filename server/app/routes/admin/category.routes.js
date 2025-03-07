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

// get category
categoryRouter.route("/view/:id?").get(getCategory);

// add category
categoryRouter
  .route("/add")
  .post(verifyAdminJwt, upload.single("categoryImage"), addCategory);

// update category
categoryRouter
  .route("/update")
  .patch(verifyAdminJwt, upload.single("categoryImage"), updateCategory);

// delete category
categoryRouter.route("/delete/:id").delete(verifyAdminJwt, deleteCategory);
