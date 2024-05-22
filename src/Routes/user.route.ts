import { Router } from "express";

import { END_POINTS } from "../config/endPoints";
import {
  connectToXstream,
  getLiveStreamCat,
  getStreamUrl,
  getVODStreamCategories,
} from "../controllers/xstreamcode.controller";
import { createDevice } from "../controllers/device.controller";
import { verifyUser } from "../middleware/authMiddleWare";

const userRoute = Router();

// Connect to xstream server

userRoute.post(END_POINTS.XSTREAM_CONNECT, connectToXstream);

// Generate device id
userRoute.post(END_POINTS.CREATE_DEVICE, createDevice);

// Get Live Stream Categories
userRoute.get(END_POINTS.LIVE_STREAM_CATEGORY, verifyUser, getLiveStreamCat);

// Get VOD Categories
userRoute.get(END_POINTS.VOD_STREAM_CATEGORY, verifyUser, getVODStreamCategories);

// Get Stream url
userRoute.get(END_POINTS.STREAM_URL, verifyUser, getStreamUrl);

export default userRoute;
