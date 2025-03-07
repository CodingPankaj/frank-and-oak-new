import { Router } from "express";
import { getProducts } from "../../controllers/web/product.controller.js";

export const productRouter = Router();

productRouter.route("/:slug?").get(getProducts);
