import express from "express";
import { placeOrder, getMyOrders } from "../controllers/order.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/place", auth, placeOrder);
router.get("/my-orders", auth, getMyOrders);

export default router;
