import { Request, Response, NextFunction, RequestHandler } from "express";
import joi, { ValidationError } from "joi";

function validationMiddleware(schema: joi.Schema): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      next();
    } catch (e: any) {
      handleValidationErrors(e, res);
    }
  };
}

function handleValidationErrors(error: ValidationError, res: Response): void {
  const errors: string[] = [];

  if (error.details && error.details.length > 0) {
    error.details.forEach((validationError) => {
      errors.push(validationError.message);
    });
  } else {
    errors.push("Invalid request data");
  }

  res.status(400).json({ errors });
}

export default validationMiddleware;
