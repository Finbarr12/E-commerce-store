import { Document, model, Schema } from "mongoose";
import { Iproducts } from "../interfaces/Products";
import { category } from "../constants/productconstant";

interface ProductSchema extends Document, Iproducts {}

const ProductSchemas: Schema<ProductSchema> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        category.all,
        category.books,
        category.electronics,
        category.mensWear,
        category.mobliePhones,
        category.womensWear,
      ],
      message: `please enter a category as supplied: ${category.all},${category.books},${category.electronics},${category.mensWear},${category.mobliePhones},${category.womensWear}`,
      default: `${category.all}`,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const ProductModel = model<ProductSchema>("Product", ProductSchemas);
