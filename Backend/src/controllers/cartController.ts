import { Request,Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../database/models/cart";
import Product from "../database/models/product";
import Category from "../database/models/category";
import { model } from "mongoose";
import User from "../database/models/userModel";
import { Model } from "sequelize";

class CartController{
    //add the product in the cart
    async addToCart(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id;  

        const { quantity, productId } = req.body;
    
        if (!quantity || !productId) {
            res.status(400).json({ message: "Please provide the quantity and productId" });  // Use 400 Bad Request for missing fields
            return;  
        }
    
        try {

            let cartItem = await Cart.findOne({ where: { productId, userId } });
            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();  
            } else {

                cartItem = await Cart.create({ quantity, userId, productId });
            }

            const data = await Cart.findAll({
                where: { userId },
                include: [{
                    model: Product
                }]
            });
    
            res.status(200).json({ message: "Product added to cart", data });
        } catch (error) {
            console.error("Error adding product to cart:", error);
            res.status(500).json({ message: "An error occurred while adding the product to the cart" });
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
            res.status(200).json({message:"Successfully get items in the cart of the login user",data:cartItem})
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