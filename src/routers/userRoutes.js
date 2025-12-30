import { Router } from "express";
import { rateLimiter } from "../utils/Utility.js";
import {
  deleteUserController,
  getUserByIdController,
  getUserController,
  signInController,
  signUpController,
  updateController,
} from "../controllers/userControllers.js";
import {
  signInValidation,
  signUpValidate,
  signUpValidation,
  updateValidation,
} from "../handler/userHandler.js";

const router = Router();

router.post(
  "/signup",
  rateLimiter,
  signUpValidation,
  signUpValidate,
  signUpController
);

router.post("/signin", rateLimiter, signInValidation, signInController);
router.post("/login", rateLimiter, signInValidation, signInController);
router.post("/update", rateLimiter, updateValidation, updateController);
router.post("/getuserbyusername", rateLimiter, getUserController);
router.post("/getuserbyid", rateLimiter, getUserByIdController);
router.post("/deleteuser", rateLimiter, updateValidation, deleteUserController);

// TODO: Add profile photo update route
// router.post("/updateProfilePhoto", rateLimiter, );

export default router;
