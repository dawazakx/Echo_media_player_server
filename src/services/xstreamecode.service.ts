import IXstreame from "../interfaces/IXstreame.interface";
import { PlayerAPI } from "../lib/xstream-codes/player";
import { PlayerApiConfig } from "../lib/xstream-codes/types";

export const connectToDevice = async (xtream: IXstreame): Promise<boolean> => {
  const { device, nickname, username, password } = xtream;
  const { id, type } = device;

  try {
    const playerConfig: PlayerApiConfig = { baseUrl: xtream.url, auth: { username, password } };
    const playerAPI = new PlayerAPI(playerConfig);

    // Validate the connection with Xtream Codes server
    await playerAPI.getAccountInfo();

    // If the connection succeeds, return true
    return true;
  } catch (error: any) {
    console.error("Error connecting to Xtream Codes server:", error.message);
    throw new Error("Failed to connect to Xtream Codes server");
  }
};
