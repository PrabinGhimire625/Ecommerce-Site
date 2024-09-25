import express, { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import reviewController from "../controllers/reviewController";

const router: Router = express.Router();

router.post("/", authMiddleware.isAuthenticated, reviewController.addReview);

export default router;
