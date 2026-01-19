import { Transaction } from "../models/Transaction.js";
import { TransactionPojos } from "../pojos/Transaction/TransactionsPojos.js";
import {} from "../utils/Constant.js";
import { ApiError } from "../utils/Utility.js";

export class TransactionDao {
  // by _id
  async getTransactionByTransactionId(transactionId) {
    try {
      const transaction = await Transaction.findById(transactionId);
      return transaction;
    } catch (error) {
      throw new ApiError(500, "Internal Server error", error);
    }
  }

  // by budgetId
  async getTransactionsByBudgetId(budgetId) {
    try {
      const transactions = await Transaction.find({
        budgetId: budgetId,
      });
      return transactions;
    } catch (error) {
      throw new ApiError(500, "Internal Server error", error);
    }
  }
  // by userId
  async getTransactionsByBudgetId(userId) {
    try {
      const transactions = await Transaction.find({
        userId: userId,
      });
      return transactions;
    } catch (error) {
      throw new ApiError(500, "Internal Server error", error);
    }
  }

  // by userId + budgetId
  async getTransactionsByBudgetId(userId, budgetId) {
    try {
      const transactions = await Transaction.find({
        userId: userId,
        budgetId: budgetId,
      });
      return transactions;
    } catch (error) {
      throw new ApiError(500, "Internal Server error", error);
    }
  }
  // generic request for get
  async getTransactionGenral(request) {
    try {
      const { budgetId, userId, type, category } = request;
      let req = {};
      if (budgetId) {
        req["budgetId"] = budgetId;
      }
      if (userId) {
        req["userId"] = userId;
      }
      if (type) {
        req["type"] = type;
      }
      if (category) {
        req["category"] = category;
      }

      if (Object.keys(req).length) {
        const transactions = await Transaction.find(req);
        return transactions;
      } else {
        console.log("Request is empty in the getTransactionGenral");
        return [];
      }
    } catch (error) {
      throw new ApiError(500, "Internal Server error", error);
    }
  }

  async createUpdateTransaction(request) {
    try {
      const {
        transactionId,
        budgetId,
        userId,
        amount,
        transactionTime,
        type,
        category,
        note,
      } = request;
      const req = TransactionPojos.createTransactionPojo({
        budgetId: budgetId,
        userId: userId,
        transactionTime: transactionTime,
        amount: amount,
        type: type,
        category: category,
        note: note,
      });

      if (transactionId && transactionId != null) {
        // update
        const transaction = this.getTransactionByTransactionId(transactionId);
        if (transaction) {
          Object.assign(
            transaction,
            TransactionPojos.updateTransactionPojo(req)
          );
          const updatedTransaction = await transaction.save();
          return updatedTransaction;
        } else return false;
      } else {
        // create
        const transaction = await Transaction.create(req);
        return transaction;
      }
    } catch (error) {
      throw new ApiError(500, "Internal Server error", error);
    }
  }

  async softDeleteTransaction(transactionId) {
    try {
      let transaction = await this.getTransactionByTransactionId(transactionId);
      if (transaction) {
        transaction.isDeleted = true;
        await transaction.save();
      } else {
        console.error("Transaction not found to delete");
        return false;
      }
      return true;
    } catch (error) {
      throw new ApiError(500, "Internal Server error", error);
    }
  }

  async hardDelete(transactionId) {
    try {
      const transaction = this.getTransactionByTransactionId(transactionId);
      if (transaction) {
        const result = await Transaction.deleteOne({
          _id: transactionId,
        });
        return result;
      } else {
        console.error("Transactio not found while delete");
        return false;
      }
    } catch (error) {
      throw new ApiError(500, "Internal Server error", error);
    }
  }
}
