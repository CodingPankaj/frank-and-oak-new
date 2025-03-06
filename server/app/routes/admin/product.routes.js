import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
} from "../../controllers/admin/product.controllers.js";
import { verifyAdminJwt } from "../../middlewares/adminAuth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

export const productRouter = Router();

productRouter.route("/view").get(getProduct);

productRouter.route("/add").post(
  verifyAdminJwt,
  upload.fields([
    {
      name: "productImages",
      maxCount: 10,
    },
  ]),
  addProduct
);

productRouter.route("/delete/:id").delete(verifyAdminJwt, deleteProduct);
