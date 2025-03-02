import { Router } from "express";
import { userRouter } from "./user.routes.js";

export const webRouter = Router();

webRouter.use("/users", userRouter);
