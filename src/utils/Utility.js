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
