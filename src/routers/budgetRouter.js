import { Router } from "express";
import { rateLimiter } from "../utils/Utility.js";
import { createBudgetValidate, createBudgetValidation } from "../handler/budgetHandler.js";
import { createUpdateBudgetController } from "../controllers/budgetControllers.js";

const router = Router();

// Define my Budget routes here with CRUD operations
// Example:
router.post("/create", rateLimiter, createBudgetValidation, createBudgetValidate, createUpdateBudgetController);
// router.post("/get", rateLimiter, getBudgetController);
router.post("/update", rateLimiter,createBudgetValidation, createUpdateBudgetController);
// router.post("/delete", rateLimiter, deleteBudgetController);


export default router;