import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { mainRouter } from "./routes/main.routes.js";
import { errorHandler } from "./middlewares/errorhandler.middleware.js";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: process.env.ACORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public/temp"));
app.use(cookieParser());

app.use("/api/v1", mainRouter);

// error handler
app.use(errorHandler);
