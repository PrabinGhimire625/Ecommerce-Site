import express, { Router } from "express";
import categoryController from "../controllers/categoryController";
import authMiddleware, { Role } from "../middleware/authMiddleware";

import { multer, storage } from "../middleware/multerMiddleware";

const upload = multer({ storage: storage });
const router: Router = express.Router();


router.route("/").post(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),upload.single('image'),categoryController.addCategory)
.get(categoryController.getCategory)

router.route("/:id").patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),categoryController.updatecategory)
router.route("/:id").delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),categoryController.deleteCategory)
.get(categoryController.fetchSingleCategory)
export default router

