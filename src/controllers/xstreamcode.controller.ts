import { Request, Response } from "express";
import { connectToDevice } from "../services/xstreamecode.service";
import validationMiddleware from "../middleware/validation.middleware";
import { connectX } from "../validations/user.validation";

export const connectToXstream = async (req: Request, res: Response) => {
  await validationMiddleware(connectX)(req, res, async () => {
    try {
      const isConnected = await connectToDevice(req.body);

      res.status(200).json({ message: "Connection established successfully", isConnected });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
};
