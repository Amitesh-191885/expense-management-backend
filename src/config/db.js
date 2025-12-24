import mongoose from "mongoose";
import { DB_NAME } from "../utils/Constant.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.info("DB connected Babu !!");
    console.log("Connction Instance ", connectionInstance.connection.host);
  } catch (error) {
    console.error("Kya kar rahe ho babu, DB Connect nahi hua ^|^");
    console.error(error);
    process.exit(1);
  }
};
