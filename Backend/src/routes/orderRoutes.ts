import express,{Router} from "express"
import authMiddleware, { Role } from "../middleware/authMiddleware"
import errorHandler from "../services/catchAsyncError"
import orderController from "../controllers/orderController"
const router:Router=express.Router()
router.route("/").post(authMiddleware.isAuthenticated,errorHandler(orderController.createOrder))
.get(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(orderController.fetchAllOrders))
router.route("/verify").post(authMiddleware.isAuthenticated,errorHandler(orderController.verifyTransaction))
router.route("/customer").get(authMiddleware.isAuthenticated, errorHandler(orderController.fetchMyOrder))

router.route("/customer/:id").patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Customer),errorHandler(orderController.cancleOrder))
.get(authMiddleware.isAuthenticated,errorHandler(orderController.fetchOrderDetails))

router.route("/admin/:id").patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(orderController.changeOrderStatus))
.delete(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(orderController.deleteOrder))

router.route("/admin/payment/:id").patch(authMiddleware.isAuthenticated,authMiddleware.restrictTo(Role.Admin),errorHandler(orderController.changePaymentStatus))

export default router
