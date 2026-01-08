import { ApiError } from "../utils/Utility.js";

// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors = {};

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";

    Object.keys(err.errors).forEach((field) => {
      errors[field] = err.errors[field].message;
    });
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate value";

    Object.keys(err.keyValue).forEach((field) => {
      errors[field] = `${field} already exists`;
    });
  }

  res.status(statusCode).json(new ApiError(statusCode, message, errors));
};

export default errorHandler;
