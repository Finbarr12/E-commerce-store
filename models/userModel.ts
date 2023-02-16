import mongoose, { Document, model, Schema } from "mongoose";
import { Iuser } from "../interfaces/User";
import isEmail from "validator/lib/isEmail";
import { authRole } from "../constants/userConstant";

interface UserSchema extends Document, Iuser {
  clearCart(): Promise<void>;
  RemoveCart(productID: string): Promise<void>;
  addToCart(productID: string, doDecrese: boolean): Promise<boolean>;
}

const userSchema: Schema<UserSchema> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provde a vaild name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a vaild email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "Input a vaild email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password should be at least 6 letters"],
    },
    confirmPassword: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: [authRole.admin, authRole.manager, authRole.user],
      meaasge: `Please identify your role as provided:${authRole.admin},${authRole.manager},${authRole.user}`,
      default: `${authRole.user}`,
    },
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please select a product"],
          },
          quantity: {
            type: Number,
            required: [true, "Please select a product"],
          },
        },
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.addToCart = function () {};
userSchema.methods.RemoveCart = function (productId:string) {
const updateCart = this.cart.items.filter((items:{productId:{toString:()=> string}})=>{
  return items.productId.toString() !== productId.toString()
  
})

this.cart.items = updateCart;
return this.save({validateBeforeSave:false})
};
userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save()
};

const UserModel = model<UserSchema>("User", userSchema);

export default UserModel;
