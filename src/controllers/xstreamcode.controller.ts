import { Request, Response } from "express";
import {
  connectToDevice,
  getLiveStreamCategories,
  getVODStreams,
  getVodCategories,
  getLiveStreams,
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

export const getLiveStreamsByCategory = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers.device_id as string;
    const { category_id } = req.query;

    const streams = await getLiveStreams(device_id, category_id as string);
    res.status(200).json({ streams });
  } catch (error: any) {
    console.error("Error fetching live streams:", error.message);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getVODStreamsByCategory = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers.device_id as string;
    const { category_id } = req.query;

    const streams = await getVODStreams(device_id, category_id as string);
    res.status(200).json({ streams });
  } catch (error: any) {
    console.error("Error fetching live streams:", error.message);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};
