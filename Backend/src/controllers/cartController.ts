import { Request,Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../database/models/cart";
import Product from "../database/models/product";
import Category from "../database/models/category";
import { model } from "mongoose";
import User from "../database/models/userModel";

class CartController{
    //add the product in the cart
    async addToCart(req:AuthRequest,res:Response):Promise<void>{
        const userId=req.user?.id  //authMiddleware bata auxa to find login user
        //console.log("User ID:", userId); // Log user ID for debugging
        const {quantity, productId}=req.body
        if(!quantity || !productId){
            res.status(404).json({message : "Please provide the quantity and productId"})
        }
        //check if the product already exists in the cart table or not for that user
        let cartItem=await Cart.findOne({where:{productId,userId}})
        if (cartItem){
            cartItem.quantity+=quantity
            await cartItem.save()  //compulsary
        }else{
            cartItem=await Cart.create({quantity,userId,productId})
            const data=await Cart.findAll({
                where:{
                    userId
                }
            }
            )
            res.status(200).json({message:"Product added to cart", data})
        }
    }

    async getCartItem(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        const cartItem=await Cart.findAll({where : {userId},
            include : [{
                model : Product,
                include : [{model : Category,attributes : ['id','categoryName']}]
            }]
        })

        if(cartItem.length===0){
            res.status(400).json({message:"No item in a cart"})
        }else{
            res.status(200).json({message:"Item is successfully added into the cart",data:cartItem})
        }
    }

    
    async deleteCart(req:AuthRequest,res:Response):Promise<void>{
        const userId=req.user?.id
        const {productId}=req.params
        const product=await Product.findByPk(productId)
        if(!product){
            res.status(404).json({message:"No product with that id"})
            return
        }else{
            await Cart.destroy({where:{userId,productId}})
            res.status(200).json({message:"Item is successfully deleted"})
        }
    }

    //update the cart
    async updateCartItem(req:AuthRequest,res:Response):Promise<void>{
        const {productId} = req.params 
        const userId = req.user?.id 
        const {quantity} = req.body  
        if(!quantity){
            res.status(400).json({message : "Please provide quantity"})
            return
        }
        const cartData = await Cart.findOne({where : {userId, productId}})
    
        if(cartData){
            cartData.quantity = quantity 
            await cartData?.save()
            res.status(200).json({ message : "Product of cart updated successfully",data : cartData})
        } else{
            res.status(404).json({message : "No productId of that userId"})
        }
    }
}

export default new CartController()