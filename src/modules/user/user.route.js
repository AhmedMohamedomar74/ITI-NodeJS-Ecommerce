import { Router } from "express";
import *as userServices from "./user.controller.js"
import { auth, refreshAuth } from "../../middelwares/auth.middleware.js";
const router = Router()

router.get("/",auth,userServices.profile)
router.get("/refresh-token",refreshAuth,userServices.profile)

export default router