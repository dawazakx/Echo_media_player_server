import { Router } from "express";

import { END_POINTS } from "../config/endPoints";
import { connectToXstream, getLiveStreamCat } from "../controllers/xstreamcode.controller";
import { createDevice } from "../controllers/device.controller";
import { verifyUser } from "../middleware/authMiddleWare";

const userRoute = Router();

// Connect to xstream server

userRoute.post(END_POINTS.XSTREAM_CONNECT, connectToXstream);

// Generate device id
userRoute.post(END_POINTS.CREATE_DEVICE, createDevice);

// Get Live Stream Categories
userRoute.get(END_POINTS.LIVE_STREAM_CAT, verifyUser, getLiveStreamCat);

export default userRoute;
