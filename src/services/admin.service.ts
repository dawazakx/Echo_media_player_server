import IAdmin from "../interfaces/admin.interface";
import ISubscription from "../interfaces/subscription.interface";
import AdminModel from "../models/admin.model";
import SubscriptionModel from "../models/subscription.model";
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

    const newToken = generateToken(admin, "admin");

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

export const appSubscription = async (data: ISubscription, user: { userType: string }) => {
  try {
    if (user.userType !== "admin") {
      throw {
        status: 401,
        message: "Unauthorized access",
      };
    }

    const newSubscription = new SubscriptionModel({
      ...data,
    });

    await newSubscription.save();

    return {
      message: "Subscription created successfully",
      subscription: newSubscription,
    };
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getAllSubscriptions = async () => {
  try {
    const subscriptions = await SubscriptionModel.find({});
    return subscriptions;
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};
