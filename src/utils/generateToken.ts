import jwt from "jsonwebtoken";
import configs from "../config/config";
import IUser from "../interfaces/user.interface";

const jwtSecretKey = configs.JWT_SECRET_KEY;

interface TokenPayload {
  userId: string;
  email: string;
  userType?: string;
}

const generateToken = (userInstance: IUser & { _id: string }, userType?: string): string => {
  const payload: TokenPayload = {
    userId: userInstance._id,
    email: userInstance.email,
    userType,
  };

  if (userType) {
    payload.userType = userType;
  }

  const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "7d" });

  return token;
};

export { generateToken };
