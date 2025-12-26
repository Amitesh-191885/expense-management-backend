import { User } from "../models/User.js";

export class UserDao {
  getUserByUserName(userName) {
    const user = User.findOne({
      userName: userName,
    });
    console.log(user);
  }
}
