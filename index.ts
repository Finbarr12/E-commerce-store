import express, { Application } from "express";
import dotenv from "dotenv";
import { envVariables } from "./config/environmentVariables";
import { appConfig } from "./app";
import { DBconnect } from "./config/Db";
dotenv.config();

const Port = envVariables.PORT || 7070;

const app: Application = express();

DBconnect();
appConfig(app);

app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
