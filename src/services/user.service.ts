import { Response } from "express";
import IUser from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { sendOtp } from "./sendOtp.service";

const createUser = async (userData: IUser, res: Response) => {
  try {
    const existingEmailUser = await UserModel.findOne({
      email: userData.email,
    });

    if (existingEmailUser) {
      throw {
        status: 409,
        message: "Email already exists",
      };
    }

    const user = new UserModel({
      ...userData,
      isVerified: false,
    });

    const { otp } = await sendOtp(user.email, user.firstName);

    await user.save();

    // Set OTP in server cookie to expire in one hour
    res.cookie("signup_otp", otp, { httpOnly: true, maxAge: 3600000 });

    // Omit the password field from the returned user data
    const { password, ...userDataWithoutPassword } = user.toObject();

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
