import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDb } from "./db/index.js";

dotenv.config({
  path: "/.env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("Mongo DB connection failed", err));
