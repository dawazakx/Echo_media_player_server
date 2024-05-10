import IDevice from "../interfaces/IDevice.interface";
import DeviceModel from "../models/device.model";
import { v4 as uuidv4 } from "uuid";

export const createDeviceService = async (deviceData: IDevice) => {
  try {
    // Generate a unique hash ID for the device
    const deviceId = uuidv4();

    const existingDevice = await DeviceModel.findOne({ deviceId });
    if (existingDevice) {
      throw new Error("Device ID already exists");
    }

    // Create a new device document with the generated ID
    await DeviceModel.create({ ...deviceData, deviceId });

    return deviceId;
  } catch (error: any) {
    // Throw error if device creation fails
    console.error("Error creating device:", error.message);
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};
