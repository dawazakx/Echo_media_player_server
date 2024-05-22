import IXstreame, { XtreamUserInfo } from "../interfaces/IXstreame.interface";
import { PlayerAPI } from "../lib/xstream-codes/player";
import { Category, PlayerApiConfig, Stream } from "../lib/xstream-codes/types";
import PlaylistModel from "../models/playlist.model";

export const connectToDevice = async (xtream: IXstreame) => {
  const { device_id, nickname, username, password } = xtream;

  try {
    const existingUser = await PlaylistModel.findOne({ device_id });

    if (existingUser) {
      throw {
        status: 400,
        message: "A user with the same device ID already exists",
      };
    }

    const playerConfig: PlayerApiConfig = { baseUrl: xtream.url, auth: { username, password } };
    const playerAPI = new PlayerAPI(playerConfig);

    // Validate the connection with Xtream Codes server
    const userInfo = await playerAPI.getAccountInfo();

    // Save the user details from Xtream to the database
    const newPlaylist = await PlaylistModel.create({
      nickname,
      device_id,
      url: xtream.url,
      xtreamUserInfo: userInfo,
    });

    return newPlaylist;
  } catch (error: any) {
    console.error("Error connecting to Xtream Codes server:", error.message);
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getLiveStreamCategories = async (device_id: string): Promise<Category[]> => {
  try {
    const playlist = await PlaylistModel.findOne({ device_id });

    if (!playlist) {
      throw {
        status: 404,
        message: "No playlist found",
      };
    }

    const { xtreamUserInfo, url } = playlist;

    const userInfo = xtreamUserInfo as XtreamUserInfo;

    if (!userInfo || !userInfo.username || !userInfo.password) {
      throw {
        status: 400,
        message: "Invalid Xtream user info",
      };
    }

    const { username, password } = userInfo;

    const playerConfig: PlayerApiConfig = { baseUrl: url, auth: { username, password } };
    const playerAPI = new PlayerAPI(playerConfig);

    // Fetch live stream categories
    const categories = await playerAPI.getLiveStreamCategory();

    return categories;
  } catch (error: any) {
    console.error("Error fetching Server live stream categories:", error.message);
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getVodCategories = async (device_id: string): Promise<Category[]> => {
  try {
    const playlist = await PlaylistModel.findOne({ device_id });

    if (!playlist) {
      throw {
        status: 404,
        message: "No playlist found",
      };
    }

    const { xtreamUserInfo, url } = playlist;

    const userInfo = xtreamUserInfo as XtreamUserInfo;

    if (!userInfo || !userInfo.username || !userInfo.password) {
      throw {
        status: 400,
        message: "Invalid Xtream user info",
      };
    }

    const { username, password } = userInfo;

    const playerConfig: PlayerApiConfig = { baseUrl: url, auth: { username, password } };
    const playerAPI = new PlayerAPI(playerConfig);

    const vodCategories = await playerAPI.getVODStreamCategories();

    return vodCategories;
  } catch (error: any) {
    console.error("Error fetching Server live stream categories:", error.message);
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getLiveStreams = async (device_id: string, category_id: string): Promise<Stream[]> => {
  try {
    const playlist = await PlaylistModel.findOne({ device_id });

    if (!playlist) {
      throw {
        status: 404,
        message: "No playlist found",
      };
    }

    const { xtreamUserInfo, url } = playlist;

    const userInfo = xtreamUserInfo as XtreamUserInfo;

    if (!userInfo || !userInfo.username || !userInfo.password) {
      throw {
        status: 400,
        message: "Invalid Xtream user info",
      };
    }

    const { username, password } = userInfo;

    const playerConfig: PlayerApiConfig = { baseUrl: url, auth: { username, password } };
    const playerAPI = new PlayerAPI(playerConfig);

    // Fetch live streams by category
    const streams = await playerAPI.getLiveStreams(category_id);

    return streams;
  } catch (error: any) {
    console.error("Error fetching live streams:", error.message);
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getVODStreams = async (device_id: string, category_id: string): Promise<Stream[]> => {
  try {
    const playlist = await PlaylistModel.findOne({ device_id });

    if (!playlist) {
      throw {
        status: 404,
        message: "No playlist found",
      };
    }

    const { xtreamUserInfo, url } = playlist;

    const userInfo = xtreamUserInfo as XtreamUserInfo;

    if (!userInfo || !userInfo.username || !userInfo.password) {
      throw {
        status: 400,
        message: "Invalid Xtream user info",
      };
    }

    const { username, password } = userInfo;

    const playerConfig: PlayerApiConfig = { baseUrl: url, auth: { username, password } };
    const playerAPI = new PlayerAPI(playerConfig);

    // Fetch live streams by category
    const streams = await playerAPI.getVODStreams(category_id);

    return streams;
  } catch (error: any) {
    console.error("Error fetching live streams:", error.message);
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};
