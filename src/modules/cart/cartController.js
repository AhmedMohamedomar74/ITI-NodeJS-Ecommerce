// controllers/cart.controller.js
import cartModel from "../../DB/models/cartModel.js";
import asyncHandler from "express-async-handler";

// ➕ Add item
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    cart = new cartModel({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.status(200).json({ message: "Item added to cart", data: cart });
});

// 🗑️ Remove item
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  let cart = await cartModel.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();
  res.status(200).json({ message: "Item removed", data: cart });
});

// ✏️ Update quantity
const updateQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  let cart = await cartModel.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    return res.status(404).json({ message: "Item not in cart" });
  }

  await cart.save();
  res.status(200).json({ message: "Cart updated", data: cart });
});

// 📜 Get user cart
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  let cart = await cartModel.findOne({ userId }).populate("items.productId");

  if (!cart) return res.status(200).json({ items: [] });

  res.status(200).json({ message: "User cart", data: cart });
});

export { addToCart, removeFromCart, updateQuantity, getCart };
