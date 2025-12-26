class UserRequest {
  constructor(requestBody) {
    this.userName = requestBody?.userName ?? "";
    this.fullName = requestBody?.fullName ?? "";
    this.email = requestBody?.email ?? "";
    this.password = requestBody?.password ?? "";
    this.avatar = requestBody?.photo;
    this.role = requestBody?.role;
    this.currency = requestBody?.currency;
    this.isDeleted = requestBody?.delete ?? false;
  }
}

class UserResponse {
  constructor(userData) {
    this.userName = userData?.userName ?? "";
    this.fullName = userData?.fullName ?? "";
    this.email = userData?.email ?? "";
    this.avatar = userData?.photo;
    this.role = userData?.role;
    this.currency = userData?.currency;
    this.isDeleted = userData?.delete ?? false;
  }
}
