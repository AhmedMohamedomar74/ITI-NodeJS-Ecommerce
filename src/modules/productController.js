import productModel from "../DB/models/productModel.js";
import asyncHandler from "express-async-handler";

//GET ==> get all products
const getProduct = asyncHandler(async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({ message: "All Product", data: products });
});

//GET ==> get else product using by id
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  res.status(200).json({ message: "get product", data: product });
});

//POST ==> create new product
const createProduct = asyncHandler(async (req, res) => {
  const product = await productModel.insertMany(req.body);
  res
    .status(201)
    .json({ message: "Product created successfully", data: product });
});

//PUT ==> update any product by id
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "product not found" });
  }

  res.status(200).json({
    message: "product updated",
    data: updatedProduct,
  });
});

//DELETE ==> delete any product by id
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await productModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Product deleted successfully",
    deletedProduct: product,
  });
});

export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
