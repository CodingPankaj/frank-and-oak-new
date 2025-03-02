import { Router } from "express";
import { webRouter } from "./web/web.routes.js";
import { adminRouter } from "./admin/admin.routes.js";

export const mainRouter = Router();

mainRouter.use("/web", webRouter);

mainRouter.use("/admin", adminRouter);
