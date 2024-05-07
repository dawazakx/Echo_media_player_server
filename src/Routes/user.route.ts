import { Router } from "express";

import { END_POINTS } from "../config/endPoints";
import { connectToXstream } from "../controllers/xstreamcode.controller";

const userRoute = Router();

// Connect to xstream server

userRoute.post(END_POINTS.XSTREAM_CONNECT, connectToXstream);

export default userRoute;
