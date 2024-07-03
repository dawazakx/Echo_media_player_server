import IXstreame, { XtreamUserInfo } from "../interfaces/IXstreame.interface";
import { PlayerAPI } from "../lib/xstream-codes/player";
import { Category, PlayerApiConfig, Stream } from "../lib/xstream-codes/types";
import DeviceModel from "../models/device.model";
import PlaylistModel from "../models/playlist.model";

export const connectToDevice = async (xtream: IXstreame) => {
  const { device_id, nickname, username, password } = xtream;

  try {
    const existingDevice = await DeviceModel.findOne({ deviceId: device_id });

    if (!existingDevice) {
      throw {
        status: 400,
        message: "Invalid device ID",
      };
    }

    // const existingUser = await PlaylistModel.findOne({ device_id });

    // if (existingUser) {
    //   throw {
    //     status: 400,
    //     message: "A user with the same device ID already exists",
    //   };
    // }

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

export const getLiveStreams = async (
  device_id: string,
  category_id: string
): Promise<Stream[]> => {
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

export const getVODStreams = async (
  device_id: string,
  category_id: string
): Promise<Stream[]> => {
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

export const getStreamURL = async (
  device_id: string,
  stream_id: number,
  stream_extension: string
): Promise<string> => {
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

    // Get the stream URL
    const streamURL = playerAPI.getStreamURL(stream_id, stream_extension);

    return streamURL;
  } catch (error: any) {
    console.error("Error fetching stream URL:", error.message);
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getEPGData = async (device_id: string, channelId: string) => {
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

    // Fetch EPG data
    const epgData = await playerAPI.getAllEPGLiveStreams(channelId);

    return epgData;
  } catch (error: any) {
    console.error("Error fetching EPG data:", error.message);
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const searchLiveData = async (device_id: string, name: string) => {
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

    const liveTV = await playerAPI.searchLiveStreams(name);

    return liveTV;
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const searchVODData = async (device_id: string, name: string) => {
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

    const vod = await playerAPI.searchVODStreams(name);

    return vod;
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getSeriesCategoriesService = async (device_id: string): Promise<Category[]> => {
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

    const categories = await playerAPI.getSeriesStreamCategories();

    return categories;
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getSeriesStreams = async (
  device_id: string,
  category_id: string
): Promise<Stream[]> => {
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

    const series = await playerAPI.getSeriesStreams(category_id);

    return series;
  } catch (error: any) {
    console.error("Error fetching series streams:", error.message);
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getSeriesInfoService = async (
  device_id: string,
  series_id: string
): Promise<Stream[]> => {
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

    const seriesInfo = await playerAPI.getSeriesInfo(series_id);

    return seriesInfo;
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    };
  }
};
