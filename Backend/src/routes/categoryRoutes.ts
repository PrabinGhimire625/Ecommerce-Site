import express, { Router } from "express";
import categoryController from "../controllers/categoryController";
import authMiddleware, { Role } from "../middleware/authMiddleware";
const router:Router=express.Router()


router.route("/").post(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),categoryController.addCategory)
.get(categoryController.getCategory)

router.route("/:id").patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),categoryController.updatecategory)
router.route("/:id").delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),categoryController.deleteCategory)


export default router