import { Router } from "express";
import {
  CreateProduct,
  GetAllProduct,
} from "../../../controllers/productControllers";
import {
  GetUsers,
  LoginUser,
  RegisterUser,
} from "../../../controllers/userController";
import { isAdmin } from "../../authorization/adminAuth";
import { userAuth } from "../../authorization/userAuthorizzed";
import {
  loginValidation,
  registerValidation,
} from "../Authvalidation/userValidation";

const router = Router();

router.route("/register").post(registerValidation, RegisterUser);
router.route("/login").post(loginValidation, LoginUser);
router.route("/allusers").get(userAuth, isAdmin, GetUsers);
router.route("/createproducts").post(CreateProduct);
router.route("/createproducts").get(GetAllProduct);

export default router;
