import { TransactionDao } from "../dao/transactionDao.js";
import { CATEGORY_ENUM, TRANSACTION_TYPE } from "../utils/Constant.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/Utility.js";

const transactionDao = new TransactionDao();

export const createUpdateTransactionController = asyncHandler(
  async function (req, res) {
    const {
      transactionId,
      budgetId,
      userId,
      amount,
      transactionTime,
      type,
      category,
      note,
    } = req.body;

    const request = {
      transactionId: transactionId ? transactionId : null,
      budgetId: budgetId,
      userId: userId,
      amount: amount,
      transactionTime: transactionTime ? transactionTime : Date.now(),
      type: type ? type : TRANSACTION_TYPE.DEBIT,
      category: category ? category : CATEGORY_ENUM.SHOPPING,
      note: note ? note : null,
    };
    const transaction = await transactionDao.createUpdateTransaction(request);

    if (transaction) {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            transactions: [transaction],
          },
          "Transaction create/updated successfully"
        )
      );
    } else {
      return res.status(500).json(new ApiError(500, "Internal Server Error."));
    }
  }
);

export const getTransactions = asyncHandler(async function (req, res) {
  const {
    transactionId,
    budgetId,
    userId,
    fromDate,
    tillDate,
    includeDeleted,
    type,
    category,
    pageNo,
  } = req.body;

  if (transactionId) {
    let transaction =
      await transactionDao.getTransactionByTransactionId(transactionId);
    if (!transaction.isDeleted) {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            transactions: [transaction],
          },
          "Transaction found successfully"
        )
      );
    }
    return res.status(404).json(
      new ApiResponse(
        404,
        {
          transactions: [],
        },
        "transaction not found, incorrect transactionId"
      )
    );
  }

  let request = {
    budgetId: budgetId,
    userId: userId,
    type: type ? type : null,
    category: category ? category : null,
  };

  let transactions = await transactionDao.getTransactionGenral(request);

  transactions = includeDeleted
    ? transactions
    : transactions.filter((t) => !t.isDeleted);
  if (fromDate && tillDate) {
    // filter transaction between fromDate , tillDate
    transactions = transactions.filter(
      (t) => t.transactionTime >= fromDate && t.transactionTime <= tillDate
    );
  }

  if (transactions.length > 0) {
    // paginated upto 30 transactions
    let totalPages = Math.ceil(transactions.length / 30);
    if (transactions.length <= 30) {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            transactions: transactions,
            currentPage: 1,
            totalPages: totalPages,
          },
          "Transactions fetched successfully"
        )
      );
    }

    if (pageNo && pageNo > 0 && pageNo <= totalPages) {
      const startIndex = (pageNo - 1) * 30;
      const endIndex = startIndex + 30;
      transactions = transactions.slice(startIndex, endIndex);
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            transactions: transactions,
            currentPage: pageNo,
            totalPages: totalPages,
          },
          "Transactions fetched successfully"
        )
      );
    }
    transactions = transactions.slice(0, 30);
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          transactions: transactions,
          currentPage: 1,
          totalPages: totalPages,
        },
        "Transactions fetched successfully"
      )
    );
  }

  return res.status(404).json(
    new ApiResponse(
      404,
      {
        transactions: [],
      },
      "User doesn't created any transactions"
    )
  );
});

export const deleteTransactionController = asyncHandler(
  async function (req, res) {
    const { transactionId, forceDelete } = req.body;

    let transaction =
      await transactionDao.getTransactionByTransactionId(transactionId);

    if (transaction && !transaction.isDeleted) {
      if (forceDelete) {
        const result = await transactionDao.hardDelete(transactionId);
        if (result) {
          return res.status(200).json(
            new ApiResponse(
              200,
              {
                deleted: result,
              },
              "Transaction deleted successfully"
            )
          );
        } else {
          return res.status(200).json(
            new ApiResponse(
              200,
              {
                deleted: result,
              },
              "Unable to delete Transaction at the moment"
            )
          );
        }
      } else {
        const result =
          await transactionDao.softDeleteTransaction(transactionId);
        if (result) {
          return res.status(200).json(
            new ApiResponse(
              200,
              {
                deleted: result,
              },
              "Transactions deleted successfully"
            )
          );
        } else {
          return res.status(200).json(
            new ApiResponse(
              200,
              {
                deleted: result,
              },
              "Unable to delete Transactions at the moment"
            )
          );
        }
      }
    }
    return res
      .status(404)
      .json(new ApiError(404, "Transaction not found, by transactionId"));
  }
);
