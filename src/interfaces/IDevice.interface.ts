import { Document } from "mongoose";

export default interface IDevice extends Document {
  type: string;
  os: string;
  deviceId: string;
}
