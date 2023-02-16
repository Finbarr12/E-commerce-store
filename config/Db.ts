import mongoose from "mongoose";
import { envVariables } from "./environmentVariables";

const URI = envVariables.DB_STRING;

export const DBconnect = async () => {
  try {
    const Connect = await mongoose.connect(URI);

    console.log(`Databse is connected to ${Connect.connection.host}`);

    console.log(`db is connected to`);
  } catch (error) {
    console.log(error);
  }
};
