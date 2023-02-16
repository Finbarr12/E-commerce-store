import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";
import { Iuser } from "../../interfaces/User";
import UserModel from "../../models/userModel";
import { AppError, HTTPCODE } from "../../utils/AppError";
import crypto from "crypto";
import { envVariables } from "../../config/environmentVariables";

interface Payload extends JwtPayload {
  _id: string;
  email: string;
}

const secret = envVariables.JWT_SECRET_KEY;

export const generateToken = (user: Payload) => {
  return jwt.sign(user, secret as Secret, { expiresIn: "1hr" });
};

//verify and authorize the user

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  //make request for our token from the headers

  const headers = req.headers.authorization;

  if (!headers || !headers!.startsWith("Bearer ")) {
    next(
      new AppError({
        httpCode: HTTPCODE.UNAUTHORIZED,
        message: "You are not authorized",
      })
    );
  }
  const token: string = headers!.split(" ")[1];

  //verify the token payload

  jwt.verify(
    token,
    secret as Secret,
    async (err: VerifyErrors | null, decodedUser: any) => {
      if (err) {
        const errMsg =
          err.name === "JsonWebTokenError" ? "Invalid Token" : err.message;
        next(
          new AppError({
            message: errMsg,
            httpCode: HTTPCODE.UNAUTHORIZED,
          })
        );
      }
      try {
        const VerifiedUsers = await UserModel.findOne({
          _id: decodedUser!._id,
        });

        if (!VerifiedUsers) {
          next(
            new AppError({
              httpCode: HTTPCODE.UNAUTHORIZED,
              message: "Unauthorized user",
            })
          );
        }
        req!.user = VerifiedUsers as Iuser;
        next();
      } catch (error) {
        console.log(error);
      }
    }
  );
};
