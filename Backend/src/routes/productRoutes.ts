import express, { Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import productController from "../controllers/productController";
import { multer, storage } from "../middleware/multerMiddleware";

const upload = multer({ storage: storage });
const router: Router = express.Router();

router.route("/").post(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Admin),
upload.single('image'), productController.addProduct).
get(productController.getAllProdust)

router.route("/:id").get(productController.getSingleProduct)
.patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),productController.updateProduct)
.delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),productController.deleteProduct)

export default router;
