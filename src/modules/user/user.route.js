import { Router } from "express";
import *as userServices from "./user.controller.js"
import { auth, refreshAuth } from "../../middelwares/auth.middleware.js";
import { removeUserCart } from "../../middelwares/cart.middelware.js";
const router = Router()

router.get("/",auth,userServices.profile)
router.put("/",auth,userServices.updateProfile)
router.get("/refresh-token",refreshAuth,userServices.profile)
router.delete("/",auth,removeUserCart,userServices.deleteProfile)

export default router