import Order from "./../../DB/models/orders.model.js";
import Cart from "./../../DB/models/cartModel.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's cart with product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "name price quantity" // include stock for validation
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

    // Calculate total price
    const totalPrice = cart.items.reduce((acc, item) => {
      return acc + (item.productId.price * item.quantity);
    }, 0);

    //  Create a new order
    const newOrder = await Order.create({
      Userid: userId,
      products: cart.items.map(item => ({
        productsId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      })),
      totalPrice,
      status: "pending" // default order status
    });

    //  Deduct purchased quantities from product stock
    for (const item of cart.items) {
      const product = await Product.findById(item.productId._id);
      product.quantity -= item.quantity;
      await product.save();
    }

    //  Clear the cart after successful order placement
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