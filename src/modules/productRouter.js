import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "./productController.js";

const productRoute = express.Router();

productRoute.get("/products", getProduct);
productRoute.get("/products/:id", getProductById);
productRoute.post("/products", createProduct);
productRoute.put("/products/:id", updateProduct);
productRoute.delete("/products/:id", deleteProduct);

export default productRoute;
