import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { productRouter } from "./product.routes.js";

export const webRouter = Router();

webRouter.use("/users", userRouter);

webRouter.use("/products", productRouter);
