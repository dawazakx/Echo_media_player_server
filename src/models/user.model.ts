import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import IUser from "../interfaces/user.interface";

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    isVerified: { type: Boolean },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Hash the password before saving to the database
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error: any) {
    return next(error);
  }
});

// Create and export the User model
const UserModel = mongoose.model<IUser & Document>("User", UserSchema);
export default UserModel;
