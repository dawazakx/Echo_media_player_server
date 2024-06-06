import { type Stream, type Category, type PlayerApiConfig, type Filter } from "./types";

/**
 * @version 2.x
 * @see https://forum.xtream-codes.com/forum/67-tutorials/
 * @see https://forum.xtream-codes.com/topic/3511-how-to-player-api-v2/
 * @see http://dtv-bg.com/showthread.php?t=39946
 * @see http://dtv-bg.com/forumdisplay.php?s=fd4e27d44a605994786f883a39987dc4&f=376
 * @see https://linuxsat-support.com/thread/124526-php-example-to-get-custom-playlist-from-xtream-codes-api-with-pretty-url-and-eas/
 * @see https://forum.xtream-codes.com/topic/3493-api-create-usersmags-view-offlineonline-streams-startstop-streams-addremove-credits-and-more/
 */
export class PlayerAPI {
  private config: PlayerApiConfig;

  /**
   * @param {{ baseUrl: string, auth: { username: string, password: string } }} [config]
   */
  constructor(config: PlayerApiConfig) {
    this.config = config;
  }

  /**
   * @param {string} baseURL
   */
  setBaseURL(baseURL: string) {
    if (!baseURL) {
      throw new Error("baseURL must be null");
    }

    this.config.baseUrl = baseURL;
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  setAuth(username: string, password: string) {
    this.config.auth = { username, password };
  }

  /**
   * execute query on xtream server
   *
   * @param {string} [action]
   * @param {{ [ key: string ]: string }} [filter]
   * @returns {promise<any>}
   */
  execute(action?: string, filter?: Filter) {
    const queryObj = {
      ...this.config.auth,
      action,
      ...filter,
    };
    const query = new URLSearchParams(queryObj as any);

    return Promise.resolve()
      .then(() => fetch(`${this.config.baseUrl}/player_api.php?${query.toString()}`))
      .then((T) => T.json())
      .then((data) => {
        if (
          action &&
          data.hasOwnProperty("user") &&
          data.user.hasOwnProperty("status") &&
          data.user_info.status === "Disabled"
        ) {
          return Promise.reject(new Error("account disabled"));
        }

        return data;
      });
  }

  getAccountInfo() {
    return this.execute().then((response) => {
      if (response.user_info.auth === 0) {
        return Promise.reject(new Error("authentication error"));
      }

      return response.user_info;
    });
  }

  getLiveStreamCategory(): Promise<Category[]> {
    return this.execute("get_live_categories");
  }

  getVODStreamCategories(): Promise<Category[]> {
    return this.execute("get_vod_categories");
  }

  getStreamURL(stream_id: number, stream_extension: string) {
    return `${this.config.baseUrl}/movie/${this.config.auth.username}/${this.config.auth.password}/${stream_id}.${stream_extension}`;
  }

  /**
   * @param {string} [category]
   */
  getLiveStreams(category: string): Promise<Stream[]> {
    return this.execute("get_live_streams", { category_id: category });
  }

  /**
   * @param {string} [category]
   */
  getVODStreams(category: any): Promise<Stream[]> {
    return this.execute("get_vod_streams", { category_id: category });
  }

  /**
   * GET VOD Info
   *
   * @param {number} id This will get info such as video codecs, duration, description, directors for 1 VOD
   */
  getVODInfo(id: number | string) {
    if (!id) {
      return Promise.reject(new Error("Vod Id not defined"));
    }

    return this.execute("get_vod_info", { vod_id: id }).then((T) => {
      if (T.hasOwnProperty("info") && T.info.length === 0) {
        return Promise.reject(new Error(`vod with id: ${id} not found`));
      }

      return T;
    });
  }

  /**
   * GET short_epg for LIVE Streams (same as stalker portal, prints the next X EPG that will play soon)
   *
   * @param {number} id
   * @param {number} limit You can specify a limit too, without limit the default is 4 epg listings
   */
  getEPGLivetreams(id: any, limit: any) {
    return this.execute("get_short_epg", { stream_id: id, limit });
  }

  /**
   * GET ALL EPG for LIVE Streams (same as stalker portal, but it will print all epg listings regardless of the day)
   *
   * @param {number} id
   */
  getAllEPGLiveStreams(id: any) {
    return this.execute("get_simple_data_table", { stream_id: id });
  }

  /**
   * Search for live streams by name
   *
   * @param {string} name
   * @returns {Promise<Stream[]>}
   */
  searchLiveStreams(name: string): Promise<Stream[]> {
    return this.execute("get_live_streams").then((streams) => {
      return streams.filter((stream: Stream) =>
        stream.name.toLowerCase().includes(name.toLowerCase())
      );
    });
  }
}
