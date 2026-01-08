import { BudgetDao } from "../dao/budgetDao.js";
import { BUDGET_CATEGORIES } from "../utils/Constant.js";
import { ApiError, ApiResponse } from "../utils/Utility.js";

// const userDao = new UserDao();
const budgetDao = new BudgetDao();

export const createBudgetValidation = [
  (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json(new ApiError(400, "Bad Request, All Fields are required"));
    }
    const { userId, category, limit, tillDate, fromDate, additionalDetails } =
      req.body;

    if (!userId || !category || !limit || !fromDate || !tillDate) {
      return res
        .status(400)
        .json(new ApiError(400, "Bad Request, All Fields are required"));
    }

    if(limit < 0){
      return res
        .status(400)
        .json(new ApiError(400, "amount limit should be positive number"));
    }

    next();
  },
];

export const createBudgetValidate = [
  async (req, res, next) => {
    const { userId, category, limit, tillDate, fromDate, additionalDetails } =
      req.body;

    /*
      1. validate fromDate, tillDate not null and fromDate < tillDate, 
      2. validate limit > 0
      3. validate category
      4. budgetId check validation for unique monthly budget
    */

    // const userInfo = await userDao.getUserByUserId(userId)

    if (fromDate == null || tillDate == null)
      return res
        .status(400)
        .json(new ApiError(400, "Bad Request, All Fields are required"));

    if (limit && limit < 0)
      return res
        .status(400)
        .json(new ApiError(400, "amount limit should be positive number"));

    if (category && !BUDGET_CATEGORIES.includes(category))
      return res.status(400).json(new ApiError(400, "invalid category"));

    const budgetId = fromDate + "_" + tillDate;

    const budget = await budgetDao.getBudgetByBudgetIdandUserId(
      budgetId,
      userId
    );


    if (budget && !budget.isDeleted) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            budget,
            "budget already exist for given time period"
          )
        );
    }

    next();
  },
];
