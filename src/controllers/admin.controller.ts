import { Request, Response } from "express";
import validationMiddleware from "../middleware/validation.middleware";
import { registerAdmin } from "../validations/admin.validation";
import { createAdmin } from "../services/admin.service";

export const adminSignup = async (req: Request, res: Response) => {
  await validationMiddleware(registerAdmin)(req, res, async () => {
    try {
      const newAdmin = await createAdmin(req.body);
      res.status(201).json(newAdmin);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "Internal Server Error" });
    }
  });
};
