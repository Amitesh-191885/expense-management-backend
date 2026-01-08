export class TransactionPojos {
  static createTransactionPojo({
    userId,
    budgetId,
    type,
    amount,
    category,
    transactionTime,
    note = null,
    isDeleted = false,
  }) {
    return {
      userId,
      budgetId,
      type,
      amount,
      category,
      note,
      transactionTime,
      isDeleted,
    };
  }

  static updateTransactionPojo({
    type,
    amount,
    category,
    transactionTime,
    note,
    isDeleted,
  }) {
    const pojo = {};
    if (type !== undefined) pojo.type = type;
    if (amount !== undefined) pojo.amount = amount;
    if (category !== undefined) pojo.category = category;
    if (transactionTime !== undefined) pojo.transactionTime = transactionTime;
    if (note !== undefined) pojo.note = note;
    if (isDeleted !== undefined) pojo.isDeleted = isDeleted;
    return pojo;
  }
}
