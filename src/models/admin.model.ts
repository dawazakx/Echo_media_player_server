import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import IAdmin from "../interfaces/admin.interface";

const AdminSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

AdminSchema.pre<IAdmin>("save", async function (next) {
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

const AdminModel = mongoose.model<IAdmin & Document>("Admin", AdminSchema);
export default AdminModel;
