import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import DeviceModel from "../models/device.model";

export const verifyUser = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const device_id = req.headers["device-id"] as string;

    if (!device_id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
        message: "Device ID missing in headers",
        status: false,
      });
    }

    const device = await DeviceModel.findOne({ deviceId: device_id });

    if (!device) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid device ID",
        status: false,
      });
    }

    req.device = device;

    next();
  } catch (err: any) {
    console.error("Error validating user:", err.message);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "User validation error",
      status: false,
    });
  }
};
