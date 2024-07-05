import IAdmin from "../interfaces/admin.interface";
import AdminModel from "../models/admin.model";
import { generateToken } from "../utils/generateToken";

export const createAdmin = async (userData: IAdmin) => {
  try {
    const existingEmailUser = await AdminModel.findOne({
      email: userData.email,
    });

    if (existingEmailUser) {
      throw {
        status: 409,
        message: "Email already exists",
      };
    }

    const user = new AdminModel({
      ...userData,
    });

    await user.save();

    const { password, ...userDataWithoutPassword } = user.toObject();

    return {
      message: "Admin created",
      user: userDataWithoutPassword,
    };
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const loginAdmin = async (email: string, password: string) => {
  try {
    let admin = await AdminModel.findOne({ email: email });

    if (!admin) {
      throw {
        status: 401,
        message: "Invalid email",
      };
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      throw {
        status: 401,
        message: "Invalid password",
      };
    }

    const newToken = generateToken(admin);

    const { password: _, ...userDataWithoutPassword } = admin.toObject();

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
