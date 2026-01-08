import mongoose from "mongoose";
import {
  CATEGORY_ENUMS,
  TRANSACTION_TYPE,
  TRANSACTION_TYPE_ENUMS,
} from "../utils/Constant.js";

const transaction = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: [true, "userId is required"],
      notNull: true,
    },
    budgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      index: true,
      required: [true, "budgetId is required"],
      notNull: true,
    },
    type: {
      type: String,
      enum: TRANSACTION_TYPE_ENUMS,
      default: TRANSACTION_TYPE.DEBIT,
      required: true,
      trim: true,
      notNull: true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
      min: [1, "Amount should be positive integer"],
      notNull: true,
    },
    category: {
      type: String,
      enum: CATEGORY_ENUMS,
      trim: true,
      required: [true, "category is required"],
      notNull: true,
    },
    note: {
      type: String,
      trim: true,
    },
    transactionTime: {
      type: Number,
      default: Date.now(),
      required: true,
      notNull: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      notNull: true,
    },
    createdAt: {
      type: Number,
      default: Date.now(),
    },
    updatedAt: {
      type: Number,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transaction);
