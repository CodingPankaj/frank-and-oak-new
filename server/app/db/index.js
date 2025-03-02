import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );

    console.log(
      `Mongo DB connection success ! Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongo DB connection failed", error);
    process.exit(1);
  }
};
