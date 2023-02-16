import { NextFunction } from "express";
import Joi from "joi";
import { AppError, HTTPCODE } from "../../utils/AppError";

export const validator = (
  schemaName: Joi.ObjectSchema,
  body: object,
  next: NextFunction
) => {
  const value = schemaName.validate(body, {
    allowUnknown: true,
    abortEarly: false,
    stripUnknown: true,
  });

  try {
    value.error
      ? next(
          new AppError({
            httpCode: HTTPCODE.UNPROCESSABLE_IDENTITY,
            message: value.error.details[0].message,
          })
        )
      : next();
  } catch (error: any) {
    next(
      new AppError({
        httpCode: HTTPCODE.BAD_REQUEST,
        message: error,
      })
    );
  }
};
