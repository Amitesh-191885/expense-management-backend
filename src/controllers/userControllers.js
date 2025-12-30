import { UserDao } from "../dao/userDao.js";
import { UserRequest, UserResponse } from "../pojos/user/UserPojos.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/Utility.js";
const userDao = new UserDao();

export const signUpController = asyncHandler(async (req, res) => {
  const userRequest = new UserRequest(req.body);
  const newUser = await userDao.createUser(userRequest);

  // remove password
  if (newUser) {
    const newUserRes = new UserResponse(newUser);
    return res
      .status(201)
      .json(new ApiResponse(201, newUserRes, "User Created Successfully."));
  } else {
    return res
      .status(409)
      .json(new ApiError(409, "Internal Server Error while creating User"));
  }
});

export const signInController = asyncHandler(async (req, res) => {
  const userRequest = new UserRequest(req.body);

  const existingUser = await userDao.getUserByEmail(userRequest.email);

  if (!existingUser) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const isPasswordValid = await existingUser.isPasswordCorrect(
    userRequest.password
  );
  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Invalid credentials"));
  }

  const userRes = new UserResponse(existingUser);
  return res
    .status(200)
    .json(new ApiResponse(200, userRes, "User signed in successfully."));
});

export const updateController = asyncHandler(async (req, res) => {
  const { userName, fullName, email, password, avatar, role, currency } =
    req.body;

  const existingUser = await userDao.getUserByUserName(userName);
  if (!existingUser) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  if (fullName) existingUser.fullName = fullName;
  if (email) existingUser.email = email;
  if (password) existingUser.password = password;
  if (avatar) existingUser.avatar = avatar;
  if (role) existingUser.role = role;
  if (currency) existingUser.currency = currency;

  await existingUser.save();
  const userRes = new UserResponse(existingUser);
  return res
    .status(200)
    .json(new ApiResponse(200, userRes, "User updated successfully."));
});

export const getUserController = asyncHandler(async (req, res) => {
  const { userName } = req.body;
  if (!userName || userName.trim() === "") {
    return res.status(400).json(new ApiError(400, "Username is required"));
  }
  const existingUser = await userDao.getUserByUserName(userName);
  if (!existingUser) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }
  const userRes = new UserResponse(existingUser);
  return res
    .status(200)
    .json(new ApiResponse(200, userRes, "User fetched successfully."));
});

export const getUserByIdController = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId || userId.trim() === "") {
    return res.status(400).json(new ApiError(400, "User ID is required"));
  }

  const existingUser = await userDao.getUserByMultipleKey([{ _id: userId }]);

  if (!existingUser) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }
  const userRes = new UserResponse(existingUser);
  return res
    .status(200)
    .json(new ApiResponse(200, userRes, "User fetched successfully."));
});

export const deleteUserController = asyncHandler(async (req, res) => {
  const { userName } = req.body;

  if (!userName || userName.trim() === "") {
    return res.status(400).json(new ApiError(400, "Username is required"));
  }

  const existingUser = await userDao.getUserByUserName(userName);

  if (!existingUser) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  // delete user logic (soft delete)

  // existingUser.isDeleted = true;
  // await existingUser.save();

  // const userRes = new UserResponse(existingUser);

  // return res
  //   .status(200)
  //   .json(new ApiResponse(200, userRes, "User deleted successfully."));

  await userDao.hardDeleteUser(existingUser);
  // Hard delete user validation

  const checkUser = await userDao.getUserByUserName(userName);

  if (checkUser) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error while deleting User"));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully."));
  }
});
