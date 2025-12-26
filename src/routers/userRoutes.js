import { Router } from "express";
import { signUp } from "../controllers/userControllers.js";

const router = Router();
router.route("/signup").post(signUp)


export default router;