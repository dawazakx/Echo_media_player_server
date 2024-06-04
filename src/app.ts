import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDatabase } from "./config/database";
import { PREFIXES } from "./config/endPoints";
import userRoute from "./Routes/user.route";
import UserRoute from "./Routes/user";

// Establish connection to DB
connectDatabase();

const app: Express = express();

// Set HTTP security headers
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hey sparans");
});

app.use(PREFIXES.API, userRoute);

app.use(PREFIXES.API + PREFIXES.USER, UserRoute);

export default app;
