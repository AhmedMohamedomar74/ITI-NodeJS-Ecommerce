import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      }
    }
  ]
}, { timestamps: true });

const wishlistModel = mongoose.model("wishlist", wishlistSchema);

export default wishlistModel;