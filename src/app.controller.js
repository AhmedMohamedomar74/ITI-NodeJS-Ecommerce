import { testConnection } from "./DB/connection.db.js"
import authRoute from "./modules/auth/auth.route.js"
import userRoute from "./modules/user/user.route.js"
import productRoute from "./modules/productRouter.js";
import express from "express"
import path from "node:path"
import dotenv from "dotenv"
import { glopalErrorHandling } from "./utils/glopalErrorHandling.js"
import cartRouter from "./modules/cart/cartRoute.js";



async function bootstrap() {
    dotenv.config({
        path: path.resolve("./config/dev.env")
    });
    const port = process.env.PORT
    const app = express()
    
    // DB
    testConnection()
    app.use(express.json())
    app.use("/auth",authRoute)
    app.use("/user",userRoute)
    app.use(productRoute);
    app.use(glopalErrorHandling)
     app.use("/",cartRouter);
    app.listen(port, () => {
        console.log(`Server is running on port = ${port}`)
    })
}

export default bootstrap