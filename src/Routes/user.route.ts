import { Router } from "express";

import { END_POINTS } from "../config/endPoints";
import { connectToXstream } from "../controllers/xstreamcode.controller";
import { createDevice } from "../controllers/device.controller";

const userRoute = Router();

// Connect to xstream server

userRoute.post(END_POINTS.XSTREAM_CONNECT, connectToXstream);

// Generate device id
userRoute.post(END_POINTS.CREATE_DEVICE, createDevice);

export default userRoute;
