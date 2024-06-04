import jwt from "jsonwebtoken";
import configs from "../config/config";
import IUser from "../interfaces/user.interface";

const secretKey = configs.SECRET_KEY;

const generateToken = (userInstance: IUser & { _id: string }): string => {
  const payload = {
    userId: userInstance._id,
    email: userInstance.email,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
};

export { generateToken };
