import rateLimit from "express-rate-limit";

export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.data = null;
    this.ack = {
      statusCode: statusCode,
      message: message,
      isSuccess: false,
      errors: errors,
    };
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.data = data;
    this.ack = {
      statusCode: statusCode,
      message: message,
      isSuccess: statusCode < 400,
    };
  }
}

export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  message: new ApiError(429, "Too many requests, please try again later."),
});
