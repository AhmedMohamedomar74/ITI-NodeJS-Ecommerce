import { testConnection } from "./DB/connection.db.js";
import authRoute from "./modules/auth/auth.route.js";
import userRoute from "./modules/user/user.route.js";
import productRoute from "./modules/product/productRouter.js";
import cartRouter from "./modules/cart/cartRoute.js";
import categoryRouter from "./modules/category/category.route.js";
import paymentRoute from "./modules/payment/payment.route.js";
import express from "express";
import path from "node:path";
import dotenv from "dotenv";
import { glopalErrorHandling } from "./utils/glopalErrorHandling.js";
import orderRouter from "./modules/orders/orders.route.js";
import cors from "cors"; // Import cors package

async function bootstrap() {
  dotenv.config({
    path: path.resolve(""),
  });
  const port = process.env.PORT || 5000;
  const app = express();

  app.use(
    cors({
      origin: "*", // Allow all origins
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
      credentials: true,
    })
  );

  // DB
  testConnection();
  app.get("/", (req, res) => {
    res.json({ message: "ITI Ecommerce API is running!" });
  });
  app.use(express.json());
  app.use("/images", express.static(path.resolve("src/images")));
  app.use("/auth", authRoute);
  app.use("/user", userRoute);
  app.use("/products", productRoute);
  app.use("/category", categoryRouter);
  app.use("/orders", orderRouter);
  app.use("/", cartRouter);
  app.use("/payment", paymentRoute);
  app.use(glopalErrorHandling);
  app.listen(port, () => {
    console.log(`Server is running on port = ${port}`);
  });

  return app;
}

export default bootstrap;
