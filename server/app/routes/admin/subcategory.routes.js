import { Router } from "express";
import { verifyAdminJwt } from "../../middlewares/adminAuth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import {
  addSubcategory,
  deleteSubcategory,
  getSubcategory,
  updateSubcategory,
} from "../../controllers/admin/subcategory.controllers.js";

export const subCategoryRouter = Router();

// get sub category
subCategoryRouter.route("/view").get(getSubcategory);

// add sub category
subCategoryRouter
  .route("/add")
  .post(verifyAdminJwt, upload.single("subcategoryImage"), addSubcategory);

//update sub category
subCategoryRouter
  .route("/update")
  .patch(verifyAdminJwt, upload.single("subcategoryImage"), updateSubcategory);

// delete sub category
subCategoryRouter.route("/delete/:id").delete(deleteSubcategory);
