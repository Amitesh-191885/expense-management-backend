import mongoose from "mongoose";
import {
  BUDGET_CATEGORIES,
  BUDGET_CATEGORIES_ENUM,
} from "../utils/Constant.js";

const budget = new mongoose.Schema(
  {
    budgetId: {
      type: String, // fromDate_tillDate
      notNull: true,
      required: true,
      unique: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      notNull: true,
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: BUDGET_CATEGORIES,
      default: BUDGET_CATEGORIES_ENUM.SALARY,
      trim: true,
      required: true,
      notNull: true,
    },
    limit: {
      type: Number,
      required: true,
      notNull: true,
      min: 0,
    },
    fromDate: {
      type: Number, // 1st day of month
      required: true,
      notNull: true,
    },
    tillDate: {
      type: Number, // end of month
      required: true,
      notNull: true,
    },
    additionalDetails: {
      type: String,
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
  {
    timestamps: true,
  }
);

export const Budget = mongoose.model("Budget", budget);
