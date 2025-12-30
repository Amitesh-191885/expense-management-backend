import mongoose from "mongoose";
import {
  BUDGET_CATEGORIES,
  BUDGET_CATEGORIES_ENUM,
} from "../utils/Constant.js";

const budget = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      enum: BUDGET_CATEGORIES,
      default: BUDGET_CATEGORIES_ENUM.SALARY,
      trim: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    month: {
      type: Number, // 1st day of month
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
    },
    additionalDetails: {
      type: String,
      trim: trim,
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
  {
    timestamps: true,
  }
);

export const Budget = mongoose.model("Budget", budget);
