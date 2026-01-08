import { BudgetDao } from "../dao/budgetDao.js";
import { BUDGET_CATEGORIES_ENUM } from "../utils/Constant.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/Utility.js";

const budgetDao = new BudgetDao();

export const createUpdateBudgetController = asyncHandler(
  async function (req, res) {
    const {
      userId,
      category,
      limit,
      fromDate,
      tillDate,
      additionalDetails,
      isDeleted,
    } = req.body;

    let request = {
      budgetId: fromDate + "_" + tillDate,
      userId: userId,
      category: category ? category : BUDGET_CATEGORIES_ENUM.SAVING,
      limit: limit,
      fromDate: fromDate,
      tillDate: tillDate,
      additionalDetails: additionalDetails ? additionalDetails : null,
      isDeleted: isDeleted ? isDeleted : false,
    };

    const budget = await budgetDao.createUpdateBudget(
      request.budgetId,
      request.userId,
      request.limit,
      request.fromDate,
      request.tillDate,
      request.category,
      request.isDeleted,
      request.additionalDetails
    );

    if (budget) {
      res
        .status(201)
        .json(
          new ApiResponse(201, budget, "Budget created/updated successfully")
        );
    } else {
      res.statusCode(500).json(new ApiError(500, "Unable to create at moment"));
    }
  }
);
