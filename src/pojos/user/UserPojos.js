import { CURRENCY_ENUM, STUDENT } from "../../utils/Constant.js";

export class UserRequest {
  constructor(requestBody) {
    this.userName = requestBody?.userName ?? "";
    this.fullName = requestBody?.fullName ?? "";
    this.email = requestBody?.email ?? "";
    this.password = requestBody?.password ?? "";
    this.avatar = requestBody?.photo;
    this.role = requestBody?.role ?? STUDENT;
    this.currency = requestBody?.currency ?? CURRENCY_ENUM.INR;
    this.isDeleted = requestBody?.delete ?? false;
  }
}

export class UserResponse {
  constructor(userData) {
    this.id = userData?._id;
    this.userName = userData?.userName ?? "";
    this.fullName = userData?.fullName ?? "";
    this.email = userData?.email ?? "";
    this.avatar = userData?.photo;
    this.role = userData?.role;
    this.currency = userData?.currency;
    this.isDeleted = userData?.delete ?? false;
  }
}

export class UserDaoPojo {
  constructor(
    username,
    fullname,
    avatar = null,
    role = STUDENT,
    currency = CURRENCY_ENUM.INR,
    email,
    password,
    isDeleted = false,
    updatedAt = Date.now()
  ) {
    this.userName = username;
    this.fullName = fullname;
    this.avatar = avatar;
    this.role = role;
    this.currency = currency;
    this.email = email;
    this.password = password;
    this.isDeleted = isDeleted;
    this.updatedAt = updatedAt;
  }
}
