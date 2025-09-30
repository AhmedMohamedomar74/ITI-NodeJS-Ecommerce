import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "./productController.js";
import {
  adminCheckmiddelware,
  auth,
} from "../../middelwares/auth.middleware.js";
import { validationMiddleware } from "../../middelwares/validation.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../validations/productValidation.js";
import upload from "../../middelwares/upload.middleware.js";

const productRoute = express.Router();
productRoute.use(auth);

//get product
productRoute.get("/all", getAllProduct);

//get product by id
productRoute.get("/:id", getProductById);

//create new product
productRoute.post(
  "",
  adminCheckmiddelware,
  validationMiddleware(createProductSchema),
  createProduct
);

//upadate product by id
productRoute.put(
  "/:id",
  adminCheckmiddelware,
  upload.single("image"),
  validationMiddleware(updateProductSchema),
  updateProduct
);

//delete product by id
productRoute.delete("/:id", adminCheckmiddelware, deleteProduct);

//get product with pagination
productRoute.get("", getProduct);

export default productRoute;
