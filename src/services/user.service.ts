import { Request, Response } from "express";
import IUser from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { sendOtp } from "./sendOtp.service";
import { generateToken } from "../utils/generateToken";

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

    res.cookie(`signup_otp${otp}`, otp, { httpOnly: true, maxAge: 3600000 });

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
    const cookieOTP = req.cookies[`signup_otp${otp}`];

    if (!cookieOTP || cookieOTP !== otp) {
      throw {
        status: 400,
        message: "OTP is either expired or invalid",
      };
    }

    user.isVerified = true;
    await user.save();

    // Destroy the OTP cookie
    res.clearCookie(`signup_otp${otp}`);

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

const login = async (email: string, password: string) => {
  try {
    // Find user by email
    let user = await UserModel.findOne({ email: email });

    // If user is not found by either email or username, throw an error
    if (!user) {
      throw {
        status: 401,
        message: "Invalid email",
      };
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await user.comparePassword(password);

    // If passwords don't match, throw an error
    if (!isPasswordValid) {
      throw {
        status: 401,
        message: "Invalid password",
      };
    }

    if (!user.isVerified) {
      throw {
        status: 401,
        message: "User is not verified",
      };
    }

    // Generate a new token for the user
    const newToken = generateToken(user);

    // Omit the password field from the returned user data
    const { password: _, ...userDataWithoutPassword } = user.toObject();

    return {
      message: "Login successful",
      token: newToken,
      user: userDataWithoutPassword,
    };
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

const forgotPassword = async (email: string, res: Response) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      };
    }

    const { otp } = await sendOtp(email, user.firstName);

    res.cookie("forgot_password_otp", otp, { httpOnly: true, maxAge: 3600000 });

    return {
      message: "OTP sent to your email for password reset",
    };
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export { createUser, verifyUserWithOTP, login, forgotPassword };
