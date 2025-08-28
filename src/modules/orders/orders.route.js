import express from "express";
import { placeOrder, getMyOrders } from "./orders.Controller.js";
import { auth } from "./../../middelwares/auth.middleware.js";

const router = express.Router();

router.post("/place", auth, placeOrder);
router.get("/my-orders", auth, getMyOrders);

export default router;
