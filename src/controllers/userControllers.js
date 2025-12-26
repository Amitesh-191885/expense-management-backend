import { ApiError, ApiResponse, asyncHandler } from "../utils/Utility.js";

export const signUp = asyncHandler(async (req, res) => {
  // validate request
  if (!Object.keys(req.body).length) {
    res.status(400).json(new ApiError(400, "Bad Request"));
    return;
  }
  // check all required field present
  // check user all ready exist
  // create user
  // check created user
  // remove password
  // return created user
  const { userName, fullName, email, password } = req.body;

  console.log(userName, fullName, email, password);

  res.status(200).json(new ApiResponse(200, null, "SuccessFully created"));
});
