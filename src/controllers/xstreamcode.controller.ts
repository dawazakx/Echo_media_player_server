import { Request, Response } from "express";
import {
  connectToDevice,
  getLiveStreamCategories,
  getVodCategories,
  getStreamURL,
  getLiveStreams,
  getVODStreams,
  getEPGData,
  searchLiveData,
  searchVODData,
  getSeriesCategoriesService,
  getSeriesStreams,
  getSeriesInfoService,
  fetchPlaylists,
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
    const device_id = req.headers["device-id"] as string;
    const categories = await getLiveStreamCategories(device_id);
    res.status(200).json({ categories });
  } catch (error: any) {
    console.error("Error fetching live stream categories:", error.message);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getVODStreamCategories = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers["device-id"] as string;
    const vodCategories = await getVodCategories(device_id);
    res.status(200).json({ vodCategories });
  } catch (error: any) {
    console.error("Error fetching VOD stream categories:", error.message);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getLiveStreamsByCategory = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers["device-id"] as string;
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
    const device_id = req.headers["device-id"] as string;
    const { category_id } = req.query;

    const streams = await getVODStreams(device_id, category_id as string);
    res.status(200).json({ streams });
  } catch (error: any) {
    console.error("Error fetching live streams:", error.message);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getStreamUrl = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers["device-id"] as string;
    const { stream_id, stream_extension } = req.query;

    if (!stream_id || !stream_extension) {
      return res.status(400).json({ message: "Stream ID and extension are required" });
    }

    const streamURL = await getStreamURL(
      device_id,
      Number(stream_id),
      stream_extension as string
    );
    res.status(200).json({ streamURL });
  } catch (error: any) {
    console.error("Error fetching stream URL:", error.message);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getLiveEPG = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers["device-id"] as string;
    const { channelId } = req.query;

    if (!channelId) {
      return res.status(400).json({ message: "channelId is required" });
    }

    const epgData = await getEPGData(device_id, channelId as string);
    res.status(200).json({ epgData });
  } catch (error: any) {
    console.error("Error fetching EPG data:", error.message);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const searchLiveTV = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers["device-id"] as string;
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const liveTV = await searchLiveData(device_id, name as string);
    res.status(200).json({ liveTV });
  } catch (error: any) {
    console.error("Error fetching live tv:", error);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const searchVOD = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers["device-id"] as string;
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const vod = await searchVODData(device_id, name as string);
    res.status(200).json({ vod });
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getSeriesCategories = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers["device-id"] as string;
    const seriesCategories = await getSeriesCategoriesService(device_id);
    res.status(200).json({ seriesCategories });
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getSeriesStreamsByCategory = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers["device-id"] as string;
    const { category_id } = req.query;

    const series = await getSeriesStreams(device_id, category_id as string);
    res.status(200).json({ series });
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getSeriesInfo = async (req: Request, res: Response) => {
  try {
    const device_id = req.headers["device-id"] as string;
    const { series_id } = req.query;

    const seriesInfo = await getSeriesInfoService(device_id, series_id as string);
    res.status(200).json({ seriesInfo });
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getDevicePlaylists = async (req: Request | any, res: Response) => {
  try {
    const device_id = req.headers["device-id"] as string;
    const user = req.user;

    const playlists = await fetchPlaylists(device_id, user);

    res.status(200).json({ playlists });
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};
