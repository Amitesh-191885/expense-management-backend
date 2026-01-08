import { Router } from "express";
import { rateLimiter } from "../utils/Utility.js";
import {
  createBudgetValidate,
  createBudgetValidation,
} from "../handler/budgetHandler.js";
import {
  createUpdateBudgetController,
  deleteBudgetController,
  getBudgetController,
} from "../controllers/budgetControllers.js";

const router = Router();

// Define my Budget routes here with CRUD operations
// Example:
router.post(
  "/create",
  rateLimiter,
  createBudgetValidation,
  createBudgetValidate,
  createUpdateBudgetController
);
router.post("/getbudgetbyuserid", rateLimiter, getBudgetController);
router.post(
  "/update",
  rateLimiter,
  createBudgetValidation,
  createUpdateBudgetController
);
router.post("/deletebybudgetid", rateLimiter, deleteBudgetController);

export default router;
