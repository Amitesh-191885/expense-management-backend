import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

const app = express();

connectDB();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "30kb" }));
app.use(cookieParser());
app.use(express.static("public"));

const port = process.env.PORT || 5000;

// routes import
import serverStatusCheck from "./src/routers/serverCheck.js";
import userRouter from "./src/routers/userRoutes.js";

//routes declares
app.use("/", serverStatusCheck);
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

export { app };
