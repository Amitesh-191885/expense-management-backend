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

export const getBudgetController = asyncHandler(async function (req, res) {
  const { userId, fromDate, tillDate, pageNo } = req.body;

  if (!userId || userId == "") {
    return res.status(400).json(new ApiError(400, "Invalid User Id"));
  }

  let budgets = await budgetDao.getBudgetsByUserId(userId);

  if (budgets.length) {
    // if fromDate and tillDate the filter
    // else return paginated top 30

    if (fromDate && tillDate) {
      budgets = budgets.filter(
        (budget) => budget.fromDate >= fromDate && budget.tillDate <= tillDate
      );

      if (budgets.length == 0) {
        return res.status(404).json(
          new ApiResponse(
            404,
            {
              budgets: [],
              currentPage: 0,
              totalPages: 0,
            },
            "No budgets found for given time period"
          )
        );
      }

      if (budgets.length < 30) {
        return res.status(200).json(
          new ApiResponse(
            200,
            {
              budgets: budgets,
              currentPage: 1,
              totalPages: 1,
            },
            "Budgets fetched successfully"
          )
        );
      }
      let totalPages = Math.ceil(budgets.length / 30);

      if (pageNo && pageNo > 0 && pageNo <= totalPages) {
        const startIndex = (pageNo - 1) * 30;
        const endIndex = startIndex + 30;
        budgets = budgets.slice(startIndex, endIndex);
        return res.status(200).json(
          new ApiResponse(
            200,
            {
              budgets: budgets,
              currentPage: pageNo,
              totalPages: totalPages,
            },
            "Budgets fetched successfully"
          )
        );
      }

      budgets = budgets.slice(0, 30);
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { budgets: budgets, currentPage: 1, totalPages: totalPages },
            "Budgets fetched successfully"
          )
        );
    }
    let totalPages = Math.ceil(budgets.length / 30);

    if (pageNo && pageNo > 0 && pageNo <= totalPages) {
      const startIndex = (pageNo - 1) * 30;
      const endIndex = startIndex + 30;
      budgets = budgets.slice(startIndex, endIndex);
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            budgets: budgets,
            currentPage: pageNo,
            totalPages: totalPages,
          },
          "Budgets fetched successfully"
        )
      );
    }

    budgets = budgets.slice(0, 30);
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          budgets: budgets,
          currentPage: 1,
          totalPages: totalPages,
        },
        "Budgets fetched successfully"
      )
    );
  } else {
    res
      .status(404)
      .json(new ApiResponse(404, [], "User doesn't created any budgets"));
  }
});
