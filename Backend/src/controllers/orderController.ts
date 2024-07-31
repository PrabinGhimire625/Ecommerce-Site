import Order from "../database/models/order";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Payment from "../database/models/payment";
import { KhaltiResponse, OrderData, OrderStatus, PaymentMethod, PaymentStatus, TransactionStatus, TransactionVerificationResponse } from "../types/orderTypes";
import OrderDetail from "../database/models/OrderDetail";
import axios from "axios";

class orderController{
    //create order
   async createOrder(req:AuthRequest, res:Response):Promise<void>{
    const userId=req.user?.id
    const {phoneNumber,shippingAddress,totalAmount,paymentDetails,items}:OrderData=req.body   //look in the orderTypes.ts
    //Payment table
    console.log(paymentDetails.paymentMethod)
    const paymentData=await Payment.create({paymentMethod:paymentDetails.paymentMethod})
    
    //Order table
    const orderData=await Order.create({phoneNumber,shippingAddress,totalAmount,userId, paymentId:paymentData.id})
    
    for(var i=0; i<items.length; i++){
        //orderDetails table
        await OrderDetail.create({
            quantity:items[i].quantity,
            productId:items[i].productId,
            orderId:orderData.id
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
       const response = await  axios.post('https://a.khalti.com/api/v2/epayment/initiate/',data,{
            headers : {
                'Authorization' : 'key baf351e1b89347d0aabb5d038a61f25a'
            }
        })
        const khaltiResponse:KhaltiResponse = response.data
        paymentData.pidx = khaltiResponse.pidx 
        paymentData.save()
        res.status(200).json({ message : "order placed successfully",url : khaltiResponse.payment_url})
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
        headers : {
            'Authorization' : 'key baf351e1b89347d0aabb5d038a61f25a'
        }
    })

    const data:TransactionVerificationResponse  = response.data 
    if(data.status === TransactionStatus.Completed ){
      await Payment.update({paymentStatus:'paid'},{
        where : {
            pidx : pidx
        }
      })
      res.status(200).json({
        message : "Payment verified successfully"
      })
    }else{
        res.status(200).json({
            message : "Payment not verified"
        })
    }
}
}

export default new orderController()