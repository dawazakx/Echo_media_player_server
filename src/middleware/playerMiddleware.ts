import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PlaylistModel from "../models/playlist.model";

export const verifyByPlayerid = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const playlist_id = req.headers["playlistid"] as string;

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
