import { Response, Request, NextFunction } from "express";
import { AppError } from "../utils/AppError";

const devError = (err: AppError, res: Response) => {
  return res.status(err.httpCode).json({
    httpcode: err.httpCode,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  devError(err, res);
};
