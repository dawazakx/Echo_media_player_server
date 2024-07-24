import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import DeviceModel from "../models/device.model";
import { chechJwt } from "./helpers";
import PlaylistModel from "../models/playlist.model";

export const verifyUser = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const device_id = req.headers["device-id"] as string;
    console.log(device_id);

    if (!device_id) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
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

export const verifyToken = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "user Unauthorized",
        status: false,
      });
    }
    // console.log(req.headers, "TOKEN::::");
    const token: any = await chechJwt(req.headers.authorization?.split(" ")[1]);
    if (!token)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid token",
        status: false,
      });

    req.user = token;

    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Token validation error",
      status: false,
    });
  }
};

export const verifyByPlayerid = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const playlist_id = req.headers["playlist-id"] as string;

    if (!playlist_id) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Player ID missing in headers",
        status: false,
      });
    }

    const playlist = await PlaylistModel.findOne({ _id: playlist_id });

    if (!playlist) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid player ID",
        status: false,
      });
    }

    req.playlist = playlist;

    next();
  } catch (err: any) {
    console.error("Error validating user:", err.message);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "User validation error",
      status: false,
    });
  }
};
