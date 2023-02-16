import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../models/Products";
import { Iproducts } from "../interfaces/Products";
import { HTTPCODE, AppError } from ".././utils/AppError";
import { asyncHandler } from ".././utils/asyncHandler";

export const CreateProduct = asyncHandler(
  async (
    req: Request<{}, {}, Iproducts>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, productImage, price, category } = req.body;

    const Product = await ProductModel.create({
      name,
      productImage,
      price,
      category,
    });
    if (!Product) {
      next(
        new AppError({
          httpCode: HTTPCODE.BAD_REQUEST,
          message: "Product not created",
        })
      );
    }
    return res.status(HTTPCODE.CREATED).json({
      message: "Created Successfully",
      data: Product,
    });
  }
);

export const GetAllProduct = asyncHandler(
  async (
    req: Request<{}, {}, Iproducts>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const Product = await ProductModel.find();
    return res.status(HTTPCODE.CREATED).json({
      message: "Created Successfully",
      data: Product,
    });
  }
);
