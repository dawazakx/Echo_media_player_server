import IAdmin from "../interfaces/admin.interface";
import AdminModel from "../models/admin.model";

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
