import { Budget } from "../models/Budget.js";
import { BUDGET_CATEGORIES_ENUM } from "../utils/Constant.js";
import { ApiError } from "../utils/Utility.js";

export class BudgetDao {
  async getBudgetByBudgetIdandUserId(budgetId, userId) {
    try {
      const budget = await Budget.findOne({
        budgetId: budgetId,
        userId: userId,
      });
      return budget;
    } catch (error) {
      throw new ApiError(
        500,
        "Internal Server Error, while fetching by userId"
      );
    }
  }

  async getBudgetsByUserId(userId) {
    try {
      let budgets = await Budget.find({
        userId: userId,
      });
      budgets = budgets.filter((t) => !t.isDeleted);
      return budgets;
    } catch (error) {
      throw new ApiError(
        500,
        "Internal Server Error, while fetching by userId"
      );
    }
  }

  async softDeleteBudget(budgetId, userId) {
    try {
      let budget = await this.getBudgetByBudgetIdandUserId(budgetId, userId);
      if (budget) {
        // update budget with isDelated false
        budget.isDeleted = true;
        await budget.save();
      } else {
        return false;
      }
      return true;
    } catch (error) {
      throw new ApiError(
        500,
        "Internal Server Error, while fetching by userId"
      );
    }
  }

  async hardDeleteBudget(budgetId, userId) {
    try {
      let budget = await this.getBudgetByBudgetIdandUserId(budgetId, userId);
      if (budget) {
        const result = await Budget.deleteOne({
          budgetId: budgetId,
        });
        return result;
      } else {
        return false;
      }
    } catch (error) {
      throw new ApiError(
        500,
        "Internal Server Error, while fetching by userId"
      );
    }
  }

  async createUpdateBudget(
    budgetId,
    userId,
    limit,
    fromDate,
    tillDate,
    category = BUDGET_CATEGORIES_ENUM.SAVING,
    isDeleted = false,
    additionalDetails = null
  ) {
    try {
      let request = {
        budgetId: budgetId,
        userId: userId,
        category: category,
        limit: limit,
        fromDate: fromDate,
        tillDate: tillDate,
        additionalDetails: additionalDetails,
        isDeleted: isDeleted,
      };
      // before create Get Budget if already exist then update
      const budget = await this.getBudgetByBudgetIdandUserId(budgetId, userId);

      if (budget) {
        Object.assign(budget, {
          budgetId: budgetId,
          userId: userId,
          category: category,
          limit: limit,
          fromDate: fromDate,
          tillDate: tillDate,
          additionalDetails: additionalDetails,
          isDeleted: isDeleted,
        });
        const updatedBudget = await budget.save();
        return updatedBudget;
      }

      const newBudget = await Budget.create(request);
      return newBudget;
    } catch (error) {
      throw new ApiError(500, "Internal Server Error, while creating budget");
    }
  }
}
