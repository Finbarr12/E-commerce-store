import { Document, Schema } from "mongoose";

export interface ReviewT {
  user: Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

export interface Iproducts extends Document {
  name: string;
  price: number;
  category: string;
  rating: number;
  productImage: string;
  numberOfReviews: number;
  reviews: ReviewT[];
}
