import cartModel from "../../DB/models/cartModel.js";
import productModel from "../../DB/models/productModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Add item
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  // Check required fields
  if (!productId || quantity === undefined) {
    return res.status(400).json({ message: "productId and quantity are required" });
  }

  // Validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  // Check if product exists in DB
  const product = await productModel.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Validate quantity
  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty <= 0) {
    return res.status(400).json({ message: "Quantity must be a positive integer" });
  }

  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    cart = new cartModel({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += qty;
  } else {
    cart.items.push({ productId, quantity: qty });
  }

  await cart.save();
  res.status(200).json({ message: "Item added to cart", data: cart });
});

//  Remove item
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  // Check required field
  if (!productId) {
    return res.status(400).json({ message: "productId is required" });
  }

  // Validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  let cart = await cartModel.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  // Check if item exists in cart
  const exists = cart.items.some((item) => item.productId.toString() === productId);
  if (!exists) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  // Remove item from cart
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();
  res.status(200).json({ message: "Item removed", data: cart });
});

//  Update quantity
const updateQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  // Check required fields
  if (!productId || quantity === undefined) {
    return res.status(400).json({ message: "productId and quantity are required" });
  }

  // Validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  // Validate quantity
  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty <= 0) {
    return res.status(400).json({ message: "Quantity must be a positive integer" });
  }

  let cart = await cartModel.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = qty;
  } else {
    return res.status(404).json({ message: "Item not in cart" });
  }

  await cart.save();
  res.status(200).json({ message: "Cart updated", data: cart });
});

//  Get user cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  let cart = await cartModel
    .findOne({ userId })
    .populate("items.productId");

  if (!cart) return res.status(200).json({ items: [] });

  // Filter out items with deleted products
  cart.items = cart.items.filter((i) => i.productId !== null);

  res.status(200).json({ message: "User cart", data: cart });
});

export { addToCart, removeFromCart, updateQuantity, getCart };
