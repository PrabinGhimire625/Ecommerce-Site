import Order from "../database/models/order";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Payment from "../database/models/payment";
import { KhaltiResponse, OrderData, OrderStatus, PaymentMethod, PaymentStatus, TransactionStatus, TransactionVerificationResponse } from "../types/orderTypes";
import OrderDetail from "../database/models/OrderDetail";
import axios from "axios";
import Product from "../database/models/product";
import Cart from "../database/models/cart";
import User from "../database/models/userModel";
import Category from "../database/models/category";

//exends all from parent Order model and declare paymentId
class ExtendedOrder extends Order{
    declare paymentId : string | null
}

class orderController{
//create order
   async createOrder(req:AuthRequest, res:Response):Promise<void>{
    const userId=req.user?.id
    const {phoneNumber,shippingAddress,totalAmount,paymentDetails,items}:OrderData=req.body   //look in the orderTypes.ts
    const paymentData=await Payment.create({paymentMethod:paymentDetails.paymentMethod})
    
    //Order table
    const orderData=await Order.create({phoneNumber,shippingAddress,totalAmount,userId, paymentId:paymentData.id})
    let responseOrderData; 
    for(var i=0; i<items.length; i++){
        //orderDetails table
        responseOrderData= await OrderDetail.create({
            quantity:items[i].quantity,
            productId:items[i].productId,
            orderId:orderData.id
        })
        //theis code : if order successfully done the items remove from the cart
        await Cart.destroy({
            where:{productId:items[i].productId,
                userId:userId
            }
        })
    }

    //khalti integration
    if(paymentDetails.paymentMethod === PaymentMethod.Khalti){
        // khalti integration
        const data = {
            return_url : "http://localhost:5173/success/",
            purchase_order_id : orderData.id,
            amount : totalAmount * 100,
            website_url :"http://localhost:5173/",
            purchase_order_name : 'orderName_' + orderData.id
        }
       const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/',data,{
            headers : {
                'Authorization' : 'key baf351e1b89347d0aabb5d038a61f25a'
            }
        })
        const khaltiResponse:KhaltiResponse = response.data
        paymentData.pidx = khaltiResponse.pidx //asign "pidx" from "khaltiResponse" to the "paymentData" object.
        paymentData.save()  //save the updated paymentData
        console.log("Khalti Payment URL:", khaltiResponse.payment_url);  // 
        res.status(200).json({
            message : "order placed successfully",
            url : khaltiResponse.payment_url, 
            data : responseOrderData
        })    
    }else{
        res.status(200).json({message :"Order placed successfully"})
    }
}

//verify transaction pidx
  async verifyTransaction(req:AuthRequest,res:Response):Promise<void>{
    const {pidx}= req.body 
    if(!pidx){
        res.status(400).json({
            message : "Please provide pidx"
        })
        return
    }
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx},{
        headers : {'Authorization' : 'key baf351e1b89347d0aabb5d038a61f25a'}
    })
    //response store in data
    const data:TransactionVerificationResponse  = response.data 
    if(data.status === TransactionStatus.Completed ){
      await Payment.update({paymentStatus:'paid'},{ where : {pidx : pidx}})
      res.status(200).json({message : "Payment verified successfully"})
    }else{
        res.status(200).json({message : "Payment not verified"})
    }
}


//customer side end here
//fetch all orders
async fetchAllOrders(req:AuthRequest, res:Response):Promise<void>{
    const orders=await Order.findAll({include:[
        {model:Payment}
    ]})
    if(orders.length>0){
        res.status(200).json({message:"All orders is successfully fetched",data:orders})
    }else{
        res.status(404).json({message:"You have not order anything ", data:[]})
    }
}

//customer side start
async fetchMyOrder(req:AuthRequest, res:Response):Promise<void>{
    const userId=req.user?.id
    const orders=await Order.findAll({where:{userId}, include:[{model:Payment}]})
    if(orders.length>0){
        res.status(200).json({message:"My Order is successfully fetched",data:orders})
    }else{
        res.status(404).json({message:"You have not order anything ", data:[]})
    }
}

async fetchOrderDetails(req: AuthRequest, res: Response): Promise<void> {
    const orderId = req.params.id;
    try {
        const orderDetails = await OrderDetail.findAll({
            where: { orderId },
            include: [
                {
                    model: Product,
                    include: [{
                        model: Category,
                        attributes: ['categoryName']
                    }]
                },
                {
                    model: Order,
                    include: [
                        {
                            model: Payment,
                            attributes: ['paymentMethod', 'paymentStatus']
                        },
                        {
                            model: User,
                            attributes: ['username', 'email']
                        }
                    ]
                }
            ]
        });

        if (orderDetails.length > 0) {
            res.status(200).json({ message: "OrderDetails is successfully fetched", data: orderDetails });
        } else {
            res.status(404).json({ message: "No order details found" }); // Changed from 500 to 404
        }
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//cancleOrder
async cancleOrder(req:AuthRequest, res:Response):Promise<void>{
    const userId=req.user?.id
    const orderId=req.params.id
    const orders:any= await Order.findAll({where:{userId, id:orderId}})
    if(orders?.orderStatus===OrderStatus.Ontheway||orders.orderStatus===OrderStatus.Preparation){
        res.status(200).json({message:"You cannot cancel order when it is ontheway  or preparation"})
         return
    }
    await Order.update({orderStatus:OrderStatus.Cancelled},{where:{id:orderId}})
    res.status(200).json({message:"Order cancalled successfully"})
}
//customer side end

//admin side start
async changeOrderStatus(req:Request,res:Response):Promise<void>{
    const orderId = req.params.id
    const orderStatus:OrderStatus = req.body.orderStatus
    await Order.update({orderStatus : orderStatus},{where : {id:orderId}})
    res.status(200).json({
        message : 'Order Status updated successfully'
    })
}

//paymentStatus
async changePaymentStatus(req:Request,res:Response):Promise<void>{
    const orderId = req.params.id 
    const paymentStatus:PaymentStatus  = req.body.paymentStatus
    const order:any = await Order.findByPk(orderId) 
    const extendedOrder : ExtendedOrder = order as ExtendedOrder
    await Payment.update({
        paymentStatus : paymentStatus
    },{
        where : {
            id : extendedOrder.paymentId
        }
    })
    res.status(200).json({
        message : `Payment Status of orderId ${orderId} updated successfully to ${paymentStatus} `
    })
}

//delete order
async deleteOrder(req:Request,res:Response):Promise<void>{
    const orderId = req.params.id 
    const order = await Order.findByPk(orderId)
    const extendedOrder : ExtendedOrder = order as ExtendedOrder
    if(order){
        await OrderDetail.destroy({where : {orderId : orderId }})
        await Payment.destroy({where : {id : extendedOrder.paymentId}})
        await Order.destroy({where : { id : orderId}})
        res.status(200).json({message : 'Order deleted successfully'})
  }else{
    res.status(404).json({
        message : "No order with that orderId"
    })
  }
}



}

export default new orderController()