import { Router } from "express";
import { adminUserRouter } from "./adminuser.routes.js";
import { categoryRouter } from "./category.routes.js";
import { sizeRouter } from "./size.routes.js";
import { colorRouter } from "./color.routes.js";
import { subCategoryRouter } from "./subcategory.routes.js";
import { productRouter } from "./product.routes.js";

export const adminRouter = Router();

adminRouter.use("/", adminUserRouter);

adminRouter.use("/category", categoryRouter);
adminRouter.use("/subcategory", subCategoryRouter);
adminRouter.use("/size", sizeRouter);
adminRouter.use("/color", colorRouter);
adminRouter.use("/product", productRouter);
