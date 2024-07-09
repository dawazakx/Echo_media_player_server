import { Request, Response } from "express";
import validationMiddleware from "../middleware/validation.middleware";
import {
  adminLoginValidation,
  registerAdmin,
  subscriptionValid,
} from "../validations/admin.validation";
import {
  appSubscription,
  createAdmin,
  getAllSubscriptions,
  loginAdmin,
} from "../services/admin.service";

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

export const adminLogin = async (req: Request, res: Response) => {
  await validationMiddleware(adminLoginValidation)(req, res, async () => {
    try {
      const { email, password } = req.body;
      const user = await loginAdmin(email, password);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "Internal Server Error" });
    }
  });
};

export const createSubscription = async (req: Request | any, res: Response) => {
  await validationMiddleware(subscriptionValid)(req, res, async () => {
    try {
      const user = req.user;
      const data = await appSubscription(req.body, user);
      res.status(201).json(data);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message || "Internal Server Error" });
    }
  });
};

export const getAllSubscriptionsController = async (req: Request | any, res: Response) => {
  try {
    const subscriptions = await getAllSubscriptions();
    res.status(200).json(subscriptions);
  } catch (error: any) {
    res.status(error.status).json({ message: error.message || "Internal Server Error" });
  }
};
