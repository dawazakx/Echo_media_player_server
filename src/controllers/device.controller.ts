import { Request, Response } from "express";
import validationMiddleware from "../middleware/validation.middleware";
import { generateDevice } from "../validations/device.validation";
import { createDeviceService } from "../services/device.service";

// Controller function to create a new device
export const createDevice = async (req: Request, res: Response) => {
  await validationMiddleware(generateDevice)(req, res, async () => {
    try {
      // Create a new device document
      const device = await createDeviceService(req.body);

      res.status(201).json({ message: "Device ID Generated", device });
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "Internal Server Error" });
    }
  });
};
