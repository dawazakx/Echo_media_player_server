import { Request, Response } from "express";
import validationMiddleware from "../middleware/validation.middleware";
import { createUser, verifyUserWithOTP } from "../services/user.service";
import { register, userOtp } from "../validations/user.validation";

export const signup = async (req: Request, res: Response) => {
  await validationMiddleware(register)(req, res, async () => {
    try {
      const newUser = await createUser(req.body, res);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "Internal Server Error" });
    }
  });
};

export const verifyUserOtp = async (req: Request, res: Response) => {
  await validationMiddleware(userOtp)(req, res, async () => {
    try {
      const user = await verifyUserWithOTP(req, res);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "Internal Server Error" });
    }
  });
};
