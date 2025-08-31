import Order from "./../../DB/models/orders.model.js";
import Cart from "./../../DB/models/cartModel.js";
import productModel from "../../DB/models/productModel.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's cart with product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "name price quantity" // فقط الحاجات المهمة للمخزون والحساب
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Check stock availability for each product
    for (const item of cart.items) {
      if (!item.productId) {
        return res.status(400).json({ message: "Some product no longer exists" });
      }
      if (item.quantity > item.productId.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.productId.name}`
        });
      }
    }

    // Find existing pending order for the user
    let order = await Order.findOne({ Userid: userId, status: "pending" });

    if (order) {
      // Update existing order
      for (const item of cart.items) {
        const existingItem = order.products.find(
          p => p.productsId.toString() === item.productId._id.toString()
        );

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          order.products.push({
            productsId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
          });
        }

        // Deduct stock
        const product = await productModel.findById(item.productId._id);
        product.quantity -= item.quantity;
        await product.save();
      }

      // Recalculate total price
      order.totalPrice = order.products.reduce(
        (acc, p) => acc + p.price * p.quantity,
        0
      );

      await order.save();
    } else {
      // Create a new order if none exists
      order = await Order.create({
        Userid: userId,
        products: cart.items.map(item => ({
          productsId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price
        })),
        totalPrice: cart.items.reduce(
          (acc, item) => acc + item.productId.price * item.quantity,
          0
        ),
        status: "pending"
      });

      // Deduct stock
      if (order.status === "complete") {
  for (const item of order.products) {
    const product = await productModel.findById(item.productsId);
    product.quantity -= item.quantity;
    await product.save();
  }
}

    }

    // Clear the cart
    cart.items = [];
    await cart.save();

    // Send a clean, formatted response
    res.status(201).json({
      message: "Order placed/updated successfully",
      order: {
        id: order._id,
        status: order.status,
        totalPrice: order.totalPrice,
        products: order.products.map(p => ({
          name: p.productsId.name,
          quantity: p.quantity,
          price: p.price
        })),
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};



export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ Userid: userId }) // Use 'Userid' to match schema
      .populate("products.productsId"); // Use 'productsId' to match schema
    
    res.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};