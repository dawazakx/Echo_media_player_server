import { Request, Response } from "express";
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
    res.cookie("otp.expires", Date.now() + 3600000, { httpOnly: true, secure: true });

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

const verifyUserWithOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      };
    }

    // Retrieve OTP from cookies
    const cookieOTP = req.cookies.signup_otp;

    if (!cookieOTP || cookieOTP !== otp) {
      throw {
        status: 400,
        message: "Invalid OTP",
      };
    }

    const now = new Date().getTime();
    const cookieExpiry = req.cookies["otp.expires"];
    if (!cookieExpiry || now > cookieExpiry) {
      throw {
        status: 400,
        message: "OTP has expired",
      };
    }

    user.isVerified = true;
    await user.save();

    // Destroy the OTP cookie
    res.clearCookie("signup_otp");

    return {
      message: "User verified successfully",
    };
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export { createUser, verifyUserWithOTP };
