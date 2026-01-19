import { Router } from "express";
import { rateLimiter } from "../utils/Utility.js";
import {
  createTransactionValidation,
  deleteTransactionValidation,
  getTransactionValidation,
} from "../handler/transactionHandler.js";
import {
  createUpdateTransactionController,
  deleteTransactionController,
  getTransactions,
} from "../controllers/transactionController.js";

const router = Router();
/* 
    /createupdate
    /delete
    /get
*/
router.post(
  "/createupdatetransaction",
  rateLimiter,
  createTransactionValidation,
  createUpdateTransactionController
);

router.post(
  "/gettransaction",
  rateLimiter,
  getTransactionValidation,
  getTransactions
);
router.post(
  "/deletetransaction",
  rateLimiter,
  deleteTransactionValidation,
  deleteTransactionController
);

export default router;
