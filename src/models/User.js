import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const user = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    role: {
      type: String,
      default: "Student",
      trim: true,
    },
    currency: {
      type: String,
      enum: ["INR", "EUR", "USD", "KWD", "JPY", "AUD"],
      default: "INR",
      trim: true,
    },
    email: {
      type: String,
      minlength: 12,
      maxlength: 80,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "password required"],
      trim: true,
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

export const User = mongoose.model("User", user);

user.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
