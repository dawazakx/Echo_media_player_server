import { Document } from "mongoose";

export default interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  isVerified?: boolean;

  access_token?: string;

  comparePassword(password: string): Promise<boolean>;
}
