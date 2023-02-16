import { Document, Schema } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userid?: Schema.Types.ObjectId;
  cart?: {
    items: {
      productsId: Schema.Types.ObjectId;
      quantity: number;
    };
  }[];
  role: string;
}

export interface IauthUser extends Request {
  user: Iuser;
}
