import { Request, Response } from "express";
import validationMiddleware from "../middleware/validation.middleware";
import {
  createUser,
  forgotPassword,
  login,
  resetPassword,
  verifyUserWithOTP,
} from "../services/user.service";
import {
  forgotPasswordValid,
  register,
  resetPasswordValidation,
  userLogin,
  userOtp,
} from "../validations/user.validation";

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

export const loginUser = async (req: Request, res: Response) => {
  await validationMiddleware(userLogin)(req, res, async () => {
    try {
      const { email, password } = req.body;
      const user = await login(email, password);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "Internal Server Error" });
    }
  });
};

export const forgotPasswordHandler = async (req: Request, res: Response) => {
  await validationMiddleware(forgotPasswordValid)(req, res, async () => {
    try {
      const { email } = req.body;
      const response = await forgotPassword(email, res);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "Internal Server Error" });
    }
  });
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  await validationMiddleware(resetPasswordValidation)(req, res, async () => {
    try {
      const { email, otp, password } = req.body;
      const response = await resetPassword(email, otp, password, req, res);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "Internal Server Error" });
    }
  });
};
