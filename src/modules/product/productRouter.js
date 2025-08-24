import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "./productController.js";
import { auth } from "../../middelwares/auth.middleware.js";

const productRoute = express.Router();
productRoute.use(auth);

productRoute.get("", getProduct);
productRoute.get("/:id", getProductById);
productRoute.post("", createProduct);
productRoute.put("/:id", updateProduct);
productRoute.delete("/:id", deleteProduct);

export default productRoute;
