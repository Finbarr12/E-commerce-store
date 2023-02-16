import { Request, Response, NextFunction } from "express";
import { Iuser } from "../interfaces/User";
import UserModel from "../models/userModel";
import { AppError, HTTPCODE } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../middlewares/authorization/userAuthorizzed";

export const RegisterUser = asyncHandler(
  async (
    req: Request<{}, {}, Iuser>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, email, password, confirmPassword } = req.body;

    const Salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(password, Salt);

    const Registered = await UserModel.create({
      name,
      email,
      password: hashedPass,
      confirmPassword: hashedPass,
    });
    return res.status(HTTPCODE.CREATED).json({
      message: "Created successfully",
      data: Registered,
    });
  }
);

export const LoginUser = asyncHandler(
  async (
    req: Request<{}, {}, Iuser>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
      next(
        new AppError({
          message: "Please fill all the input fields",
          httpCode: HTTPCODE.BAD_REQUEST,
        })
      );
    }
    const user = await UserModel.findOne({ email });
    const checkPass = await bcrypt.compare(password, user!.password);

    if (!checkPass) {
      next(
        new AppError({
          message: "Provide the vaild input",
          isOperational: true,
          httpCode: HTTPCODE.UNAUTHORIZED,
        })
      );
    }

    const Token = generateToken({ email: user!.email, _id: user!._id });
    return res.status(HTTPCODE.OK).json({
      message: `${user!.name} logged in successfully`,
      data: Token,
    });
  }
);

export const GetUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const Allusers = await UserModel.find();

    return res.status(HTTPCODE.OK).json({
      message: "Gotten successfully",
      data: Allusers,
    });
  }
);
