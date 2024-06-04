import { Request, Response } from "express";
import validationMiddleware from "../middleware/validation.middleware";
import createUser from "../services/user.service";
import { register } from "../validations/user.validation";

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
