import Order from "./../../DB/models/orders.model.js";
import Cart from "./../../DB/models/cartModel.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get cart with populated product details
    const cart = await Cart.findOne({ userId })
      .populate({
        path: "items.productId",
        select: "name price" // Only populate necessary fields
      });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total price
    const totalPrice = cart.items.reduce((acc, item) => {
      return acc + (item.productId.price * item.quantity);
    }, 0);

    // Create order - note the field name corrections
    const newOrder = await Order.create({
      Userid: userId, // Note: your schema uses 'Userid' not 'userId'
      products: cart.items.map(item => ({
        productsId: item.productId._id, // Note: your schema uses 'productsId' not 'productId'
        quantity: item.quantity,
        price: item.productId.price
      })),
      totalPrice
    });

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    res.status(201).json({ 
      message: "Order placed successfully", 
      order: newOrder 
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