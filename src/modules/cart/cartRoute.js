import express from "express";

import { addToCart, getCart, removeFromCart, updateQuantity } from "./cartController.js";
import { auth } from "../../middelwares/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.post("/cart/add", auth, addToCart);
cartRouter.delete("/cart/remove",auth, removeFromCart);
cartRouter.put("/cart/update",auth, updateQuantity);
cartRouter.get("/cart/",auth, getCart);

export default cartRouter;
