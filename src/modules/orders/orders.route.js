import express from "express";
import { placeOrder, getMyOrders } from "./orders.Controller.js";
import { auth } from "./../../middelwares/auth.middleware.js";

const router = express.Router();
router.use(auth)
router.post("/place", placeOrder);
router.get("/my-orders", getMyOrders);

export default router;
