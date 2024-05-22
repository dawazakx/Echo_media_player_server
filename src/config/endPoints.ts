const END_POINTS = {
  XSTREAM_CONNECT: "/connect-xstream",
  CREATE_DEVICE: "/generate-device-id",
  LIVE_STREAM_CATEGORY: "/live-stream-category",
  VOD_STREAM_CATEGORY: "/vod-stream-category",

  VOD_STREAMS: "/vod-stream/:category_id",
};

const PREFIXES = {
  API: "/api/v1/",
  USER: "user/",
};
export { END_POINTS, PREFIXES };
