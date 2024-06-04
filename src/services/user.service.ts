import { Response } from "express";
import IUser from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { generateToken } from "../utils/generateToken";
import { sendOtp } from "./sendOtp.service";

const createUser = async (userData: IUser, res: Response) => {
  try {
    // Check if a user with the same email already exists
    const existingEmailUser = await UserModel.findOne({
      email: userData.email,
    });

    if (existingEmailUser) {
      throw {
        status: 409,
        message: "Email already exists",
      };
    }

    // Create an instance of UserModel
    const newUserInstance = new UserModel({
      ...userData,
      isVerified: false,
    });

    // Generate a token for the user
    const token = generateToken(newUserInstance);

    // Send OTP and get expiration time
    const { otp } = await sendOtp(newUserInstance.email, newUserInstance.firstName);

    // Save the user with the token and false isVerified
    newUserInstance.token = token;
    await newUserInstance.save();

    // Set OTP in server cookie to expire in one hour
    res.cookie("otp", otp, { httpOnly: true, maxAge: 3600000 });

    // Omit the password field from the returned user data
    const { password, ...userDataWithoutPassword } = newUserInstance.toObject();

    return {
      message: "OTP sent to your email",
      user: userDataWithoutPassword,
    };
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export default createUser;
