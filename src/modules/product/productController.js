import productModel from "../../DB/models/productModel.js";
import asyncHandler from "express-async-handler";
import { roleEnum } from "../../DB/models/User.model.js";

//GET ==> get all products
const getAllProduct = asyncHandler(async (req, res, next) => {
  const products = await productModel.find();
  res.status(200).json({ message: "All Product", data: products });
});

//GET ==> get all product with pagination
const getProduct = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await productModel.countDocuments();

  const products = await productModel.find().skip(skip).limit(limit);

  res.status(200).json({
    message: "All products",
    page,
    totalPages: Math.ceil(totalProducts / limit),
    totalProducts,
    data: products,
  });
});

//GET ==> get else product using by id
const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  res.status(200).json({ message: "get product", data: product });
});

//POST ==> create new product
const createProduct = asyncHandler(async (req, res, next) => {
  if (req.user.role === roleEnum.admin) {
    const product = await productModel.insertMany(req.body);
    res
      .status(201)
      .json({ message: "Product created successfully", data: product });
  } else {
  }
  next(new Error("invalid token"));
});

//PUT ==> update any product by id
const updateProduct = asyncHandler(async (req, res) => {
  if (req.user.role === roleEnum.admin) {
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
  } else {
    next(new Error("invalid token"));
  }
});

//DELETE ==> delete any product by id
const deleteProduct = asyncHandler(async (req, res) => {
  if (req.user.role === roleEnum.admin) {
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
  } else {
    next(new Error("invalid token"));
  }
});

export {
  getAllProduct,
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
