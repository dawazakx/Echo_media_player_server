import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDatabase } from "./config/database";
import { PREFIXES } from "./config/endPoints";
import UserRoute from "./Routes/user";
import cookieParser from "cookie-parser";
import xstreamRoute from "./Routes/xstream.route";


// Establish connection to DB
connectDatabase();

const app: Express = express();

// Set HTTP security headers
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hey sparans");
});

app.use(PREFIXES.API, xstreamRoute);

app.use(PREFIXES.API + PREFIXES.USER, UserRoute);

export default app;
