import { ApiError } from "../utils/Utility.js";

export const createTransactionValidation = [
  (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json(new ApiError(400, "Bad Request, All Fields are required"));
    }

    const { budgetId, userId, amount } = req.body;

    if (!budgetId || !userId || !amount) {
      return res
        .status(400)
        .json(new ApiError(400, "Bad Request, All Fields are required"));
    }

    if (amount <= 0) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Bad Request, minimum amount should be positive")
        );
    }

    next();
  },
];

export const getTransactionValidation = [
  (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json(new ApiError(400, "Bad Request, All Fields are required"));
    }

    next();
  },
];
export const deleteTransactionValidation = [
  (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json(new ApiError(400, "Bad Request, All Fields are required"));
    }
    const { transactionId } = req.body;
    if (!transactionId) {
      return res
        .status(400)
        .json(new ApiError(400, "Bad Request, All Fields are required"));
    }
    next();
  },
];
