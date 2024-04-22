import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import httpStatusCodes from "http-status-codes";
import usersRouter from "./api/components/users/users.router";

// import Logger from "./services/Logger";
// import { filePath } from "./utils";

// const logger = new Logger(filePath(__filename));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Add APIs

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // logger.err(err);
  console.error(err);
  return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message,
  });
});

// Export express instance
export default app;
