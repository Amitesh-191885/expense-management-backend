import mongoose from "mongoose";

const budget = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      enum: ["saving", "salary"],
      default: "salary",
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
  },
  {
    timestamps: true,
  }
);

export const Budget = mongoose.model("Budget", budget);
