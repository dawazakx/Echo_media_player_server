import IXstreame from "../interfaces/IXstreame.interface";
import { PlayerAPI } from "../lib/xstream-codes/player";
import { PlayerApiConfig } from "../lib/xstream-codes/types";
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
