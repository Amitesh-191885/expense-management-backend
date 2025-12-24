import express from "express";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

const app = express();

connectDB()

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
