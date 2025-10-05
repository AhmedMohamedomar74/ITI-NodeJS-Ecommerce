import { Router } from "express";
import { adminCheckmiddelware, auth } from "../../middelwares/auth.middleware.js";
import *as categoryServices from "./category.controller.js"

const router = Router()
router.use(auth)
router.get("/",categoryServices.getAllCategory)
router.post("/",adminCheckmiddelware, categoryServices.createCategory);
router.get("/:id",adminCheckmiddelware,categoryServices.getCategory)
router.put("/:id",adminCheckmiddelware,categoryServices.updateCategory)
router.delete("/:id",adminCheckmiddelware,categoryServices.deleteCategory)

export default router
