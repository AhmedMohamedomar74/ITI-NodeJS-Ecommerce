import express from "express";
import { auth } from "../../middelwares/auth.middleware.js";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  clearWishlist,
  checkInWishlist
} from "./wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.use(auth);

// POST /api/wishlist - Add product to wishlist
wishlistRouter.post("/", addToWishlist);

// DELETE /api/wishlist/remove - Remove product from wishlist
wishlistRouter.delete("/remove", removeFromWishlist);

// GET /api/wishlist - Get user's wishlist
wishlistRouter.get("/", getWishlist);

// DELETE /api/wishlist/clear - Clear entire wishlist
wishlistRouter.delete("/clear", clearWishlist);


// GET /api/wishlist/check/:productId - Check if product is in wishlist
wishlistRouter.get("/check/:productId", checkInWishlist);

export default wishlistRouter;