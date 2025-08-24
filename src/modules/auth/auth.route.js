import { Router } from "express";
import *as authServices from "./auth.controller.js"
import { validateLoginCredentials, validatePassword } from "../../middelwares/auth.middleware.js";
const router = Router()

router.post("/signup",authServices.signup)
router.get("/verify/:email",authServices.verfiyEmail)
router.post("/login",validateLoginCredentials, validatePassword,authServices.login)

export default router