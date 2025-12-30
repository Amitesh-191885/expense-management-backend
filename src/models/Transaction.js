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
    },
    budgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
    },
    type: {
      type: String,
      enum: TRANSACTION_TYPE_ENUMS,
      default: TRANSACTION_TYPE.DEBIT,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
      min: [1, "Amount should be positive integer"],
    },
    category: {
      type: String,
      enum: CATEGORY_ENUMS,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    transactionTime: {
      type: Number,
      default: Date.now(),
    },
    isDeleted: {
      type: Boolean,
      default: false,
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
