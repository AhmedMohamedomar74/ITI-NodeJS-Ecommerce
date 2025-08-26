import { Router } from "express";
import *as userServices from "./user.controller.js"
import { auth, refreshAuth } from "../../middelwares/auth.middleware.js";
import { removeUserCart } from "../../middelwares/cart.middelware.js";
import { validateUpdateProfile } from "../../middelwares/validation.middleware.js";
const router = Router()
router.use(auth)
router.get("/",userServices.profile)
router.put("/",validateUpdateProfile,userServices.updateProfile)
router.delete("/",removeUserCart,userServices.deleteProfile)

export default router