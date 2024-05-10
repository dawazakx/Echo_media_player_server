import { Schema, model } from "mongoose";
import IDevice from "../interfaces/IDevice.interface";

const deviceSchema = new Schema<IDevice>({
  type: { type: String, enum: ["mobile", "web", "tv"], required: true },
  os: { type: String, enum: ["android", "ios", "web", "webOs", "tizen"], required: true },
  deviceId: { type: String },
});

const DeviceModel = model<IDevice>("Device", deviceSchema);

export default DeviceModel;
