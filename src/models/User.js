import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CURRENCY_ENUM, CURRENCY_ENUMS, STUDENT } from "../utils/Constant.js";

const user = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
      index: true,
      notNull: true,
    },
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
      notNull: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: STUDENT,
      trim: true,
      notNull: true,
    },
    currency: {
      type: String,
      enum: CURRENCY_ENUMS,
      default: CURRENCY_ENUM.INR,
      trim: true,
      notNull: true,
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
      notNull: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "password required"],
      trim: true,
      minlength: 6,
      maxlength: 128,
      notNull: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      notNull: true,
    },
    updatedAt: {
      type: Number,
    },
    createdAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

user.pre("save", async function () {
  if (!this.isModified("password")) return;

  await bcrypt
    .hash(this.password, 10)
    .then((hashed) => {
      this.password = hashed;
    })
    .catch();
});

user.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

user.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", user);
