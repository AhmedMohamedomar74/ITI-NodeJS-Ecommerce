import { testConnection } from "./DB/connection.db.js";
import authRoute from "./modules/auth/auth.route.js";
import userRoute from "./modules/user/user.route.js";
import productRoute from "./modules/product/productRouter.js";
import cartRouter from "./modules/cart/cartRoute.js";
import categoryRouter from "./modules/category/category.route.js"
import express from "express";
import path from "node:path";
import dotenv from "dotenv";
import { glopalErrorHandling } from "./utils/glopalErrorHandling.js";
import orderRouter from "./modules/orders/orders.route.js";

async function bootstrap() {
  dotenv.config({
    path: path.resolve("./config/dev.env"),
  });
  const port = process.env.PORT;
  const app = express();

  // DB
  testConnection();
  app.use(express.json());
  app.use("/images", express.static("images"));
  app.use("/auth", authRoute);
  app.use("/user", userRoute);
  app.use("/products",productRoute);
  app.use("/category",categoryRouter)
  app.use("/orders", orderRouter); 
  app.use("/",cartRouter);
  app.use(glopalErrorHandling);
  app.listen(port, () => {
    console.log(`Server is running on port = ${port}`);
  });
}

export default bootstrap;
