import mongoose from "mongoose";

const CATEGORY_ENUM = [
  "food",
  "rent",
  "travel",
  "shopping",
  "entertainment",
  "others",
];
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
      enum: ["credit", "debit"],
      default: "debit",
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
      min: [1, "Amount should be positive integer"],
    },
    catagory: {
      type: String,
      enum: CATEGORY_ENUM,
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
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transaction);
