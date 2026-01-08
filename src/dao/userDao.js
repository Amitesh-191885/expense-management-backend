import { User } from "../models/User.js";
import { UserDaoPojo } from "../pojos/user/UserPojos.js";

export class UserDao {
  async getUserByUserName(userName) {
    const user = await User.findOne({
      userName: userName,
    });
    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({
      email: email,
    });
    return user;
  }

  async getUserByMultipleKey(request = [{}]) {
    const users = await User.findOne({
      $or: request,
    });
    return users;
  }

  async createUser(request) {
    const {
      userName,
      fullName,
      email,
      password,
      avatar,
      role,
      currency,
      isDeleted,
    } = request;

    const userObj = new UserDaoPojo(
      userName,
      fullName,
      avatar,
      role,
      currency,
      email,
      password,
      isDeleted
    );
    const newUser = await User.create(userObj);

    return newUser;
  }

  async updateUser(user) {
    const updatedUser = await user.save();
    return updatedUser;
  }

  async deleteUser(user) {
    user.isDeleted = true;
    const deletedUser = await user.save();
    return deletedUser;
  }

  async getAllUsers() {
    const users = await User.find({ isDeleted: false });
    return users;
  }

  async hardDeleteUser(user) {
    const result = await User.deleteOne({ _id: user._id });
    return result;
  }
}
