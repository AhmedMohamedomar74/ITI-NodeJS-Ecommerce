import express from "express";
import { auth } from "./../../middelwares/auth.middleware.js";
import * as paymentContoller from "./payment.controller.js"

const router = express.Router();
// router.use(auth)

router.post("/placeOrder",auth,paymentContoller.placeOrder)
router.get("/confirmOrder",paymentContoller.confirmOrder)
router.get("/cancelOrder",paymentContoller.cancelOrder)

export default router