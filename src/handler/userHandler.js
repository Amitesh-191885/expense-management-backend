import { UserDao } from "../dao/userDao.js";
import { CURRENCY_ENUMS } from "../utils/Constant.js";
import { ApiError } from "../utils/Utility.js";

export const signUpValidation = [
  (req, res, next) => {
    console.log("Validating sign up request...");
    if (!Object.keys(req.body).length) {
      return res.status(400).json(new ApiError(400, "Bad Request"));
    }

    const { userName, fullName, email, password } = req.body;

    if (!userName || !fullName || !email || !password) {
      return res.status(400).json(new ApiError(400, "All Fields are required"));
    }

    if (
      [userName, fullName, email, password].some(
        (value) => value?.trim() === ""
      )
    ) {
      return res.status(400).json(new ApiError(400, "All Fields are required"));
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json(new ApiError(400, "Password must be at least 8 characters long"));
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res
        .status(400)
        .json(new ApiError(400, "Please enter a valid email"));
    }

    next();
  },
];

export const signUpValidate = async (req, res, next) => {
  console.log("Further validating sign up request...");
  // Add your additional validation logic here
  const { userName, email } = req.body;
  const userDao = new UserDao();

  const existedUsers = await userDao.getUserByMultipleKey([
    { userName: userName },
    { email: email },
  ]);
  if (existedUsers) {
    return res.status(409).json(new ApiError(409, "User already exists"));
  }

  next();
};

export const signInValidation = [
  (req, res, next) => {
    console.log("Validating sign in request...");
    if (!Object.keys(req.body).length) {
      return res.status(400).json(new ApiError(400, "Bad Request"));
    }
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(400).json(new ApiError(400, "All Fields are required"));
    }
    if ([password, email].some((value) => value?.trim() === "")) {
      return res.status(400).json(new ApiError(400, "All Fields are required"));
    }
    next();
  },
];

export const updateValidation = [
  (req, res, next) => {
    console.log("Validating update request...");
    if (!Object.keys(req.body).length) {
      return res.status(400).json(new ApiError(400, "Bad Request"));
    }

    const { fullName, role, currency } = req.body;

    if (role && role.trim() === "") {
      return res.status(400).json(new ApiError(400, "Role cannot be empty"));
    }

    if (fullName && fullName.trim() === "") {
      return res
        .status(400)
        .json(new ApiError(400, "Full Name cannot be empty"));
    }

    if (role && role.trim() === "") {
      return res.status(400).json(new ApiError(400, "Role cannot be empty"));
    }

    if (currency && !CURRENCY_ENUMS.includes(currency)) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid currency specified"));
    }

    next();
  },
];
