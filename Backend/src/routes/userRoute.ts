import express, { Router } from "express";
import AuthController from "../controllers/userController";
import errorHandler from "../services/catchAsyncError";
import authMiddleware, { Role } from "../middleware/authMiddleware";
const router:Router=express.Router()

router.route("/register").post(errorHandler(AuthController.registerUser))
router.route("/login").post(errorHandler(AuthController.loginUser))
router.route("/profile").get(authMiddleware.isAuthenticated,errorHandler(AuthController.fetchUserProfile))
router.route("/users").get(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(AuthController.fetchAllUsers))

router.route("/users/:id").get(authMiddleware.isAuthenticated,errorHandler(AuthController.fetchSingleUsers))
.patch(authMiddleware.isAuthenticated,errorHandler(AuthController.updateUser))
.delete(authMiddleware.isAuthenticated,errorHandler(AuthController.deleteUser))

export default router