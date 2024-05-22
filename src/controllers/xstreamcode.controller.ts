import { Request, Response } from "express";
import {
  connectToDevice,
  getLiveStreamCategories,
  getStreamURL,
  getVodCategories,
} from "../services/xstreamecode.service";
import validationMiddleware from "../middleware/validation.middleware";
import { connectX } from "../validations/playlist.validation";

export const connectToXstream = async (req: Request, res: Response) => {
  await validationMiddleware(connectX)(req, res, async () => {
    try {
      const isConnected = await connectToDevice(req.body);

      res.status(200).json({ message: "Connection established successfully", isConnected });
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "Internal Server Error" });
    }
  });
};

export const getLiveStreamCat = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers.device_id as string;
    const categories = await getLiveStreamCategories(device_id);
    res.status(200).json({ categories });
  } catch (error: any) {
    console.error("Error fetching live stream categories:", error.message);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getVODStreamCategories = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers.device_id as string;
    const vodCategories = await getVodCategories(device_id);
    res.status(200).json({ vodCategories });
  } catch (error: any) {
    console.error("Error fetching VOD stream categories:", error.message);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getStreamUrl = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers.device_id as string;
    const { stream_id, stream_extension } = req.query;

    if (!stream_id || !stream_extension) {
      return res.status(400).json({ message: "Stream ID and extension are required" });
    }

    const streamURL = await getStreamURL(device_id, Number(stream_id), stream_extension as string);
    res.status(200).json({ streamURL });
  } catch (error: any) {
    console.error("Error fetching stream URL:", error.message);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};
