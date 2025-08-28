import Order from "./../../DB/models/orders.model.js";
import Cart from "./../../DB/models/cartModel.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id; // from JWT
    const cart = await Cart.findOne({ userId })
    console.log({cart})
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const totalPrice = cart.products.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    // Create order
    const newOrder = await Order.create({
      userId,
      products: cart.products.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      })),
      totalPrice
    });

    // Clear cart after order
    cart.products = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).populate("products.productId");
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
