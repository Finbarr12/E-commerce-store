import express, {
  Application,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import morgan from "morgan";
import { AppError, HTTPCODE } from "./utils/AppError";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./middlewares/validation/router/router";

export const appConfig = (app: Application) => {
  app.use(express.json()).use(cors()).use(morgan("dev")).use(urlencoded());
  app.use("/api", router);
  //catch wrong routes
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new AppError({
        message: `This route ${req.originalUrl} dosen't exist`,
        httpCode: HTTPCODE.NOT_FOUND,
      })
    );
  });

  //error middleware

  app.use(errorHandler);
};
