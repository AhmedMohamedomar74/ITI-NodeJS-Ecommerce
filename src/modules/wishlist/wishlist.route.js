import express from "express";
import { auth } from "../../middelwares/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.use(auth);

export default cartRouter;