import { Router } from "express";
import { asyncHandler } from "../utils/Utility.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    res.send("Server is UP");
  })
);

router.get(
  "/health",
  asyncHandler(async function (req, res) {
    res.status(200).json({
      status: "Server Running status OK",
      timestamp: new Date().toISOString(),
    });
  })
);

router.post(
  "/api/v1/status",
  asyncHandler(async function name(req, res) {
    console.info("server requested");
    res.status(200).json({
      message: "Server chal raha hai babu !!",
    });
  })
);

export default router;
