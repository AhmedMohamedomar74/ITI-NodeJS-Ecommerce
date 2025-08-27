import { Router } from "express";
import { adminCheckmiddelware, auth } from "../../middelwares/auth.middleware.js";
import *as categoryServices from "./category.controller.js"

const router = Router()
router.use(auth,adminCheckmiddelware)
router.get("/",categoryServices.getAllCategory)
router.post("/", categoryServices.createCategory);
router.get("/:id",categoryServices.getCategory)
router.put("/:id",categoryServices.updateCategory)
router.delete("/:id",categoryServices.deleteCategory)

export default router
