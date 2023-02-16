import { NextFunction, Request, Response } from "express";
import { authRole } from "../../constants/userConstant";
import { IauthUser, Iuser } from "../../interfaces/User";
import { AppError, HTTPCODE } from "../../utils/AppError";

export const isAdmin = async (
  req: Request<{}, {}, IauthUser>,
  res: Response,
  next: NextFunction
) => {
  const user = req.body.user as Iuser;

  const adminUser = user && user.role === authRole.admin;

  if (!adminUser) {
    next(
      new AppError({
        message: "Unauthorized user",
        httpCode: HTTPCODE.UNAUTHORIZED,
      })
    );
  }

  next();
};
