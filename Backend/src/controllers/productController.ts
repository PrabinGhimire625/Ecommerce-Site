import { Request, Response } from "express";
import Product from "../database/models/product";
import { AuthRequest } from "../middleware/authMiddleware";
import { model } from "mongoose";
import User from "../database/models/userModel";
import Category from "../database/models/category";
import { where } from "sequelize";

class productController {
  //add the product
  async addProduct(req: AuthRequest, res: Response): Promise<void>{
    const userId=req.user?.id  //from the authMiddleware req.user to find the adminId
    const { productName, productDescription, productPrice, productTotalStockQty,categoryId } = req.body;
    let fileName;
    if (req.file) {
      fileName = req.file?.filename;
    } else {
      fileName = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww";
    }
    try {
      const product = await Product.create({
        productName,
        productDescription,
        productPrice,
        productTotalStockQty,
        productImageUrl: fileName,
        userId:userId,
        categoryId:categoryId
      });
      res.status(200).json({ message: "Product is added successfully", data:product});
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: "Failed to add product" });
    }
  }

  //find all product and return array
  async getAllProdust(req:Request,res:Response):Promise<void>{
    // const product =await Product.findAll();
    const product =await Product.findAll(
      {include:[
        {model:User, attributes:['id','email','username']},
        {model:Category, attributes:['categoryName',]},

      ]});  //product table ko sabai + join garara user table ko sabai data return garxa
    
    res.status(200).json({message : "Successfully get all the product",data:product})
  }

  //get single product
  async getSingleProduct(req:Request, res:Response):Promise<void>{
    const id=req.params.id
    const product=await Product.findAll({where:{id:id}})
    res.status(200).json({message:"Single product is successfully fetched", data:product})
  }


  //update the product
  async updateProduct(req:Request, res:Response):Promise<void>{
    const id=req.params.id
    const {productName}=req.body
    await Product.update({productName},{where:{id:id}})
    res.status(200).json({message:"Product is successfully updated"})
  }

  //delete product
  async deleteProduct(req:Request,res:Response):Promise<void>{
    const id=req.params.id
    const product=await Product.findAll({where:{id:id}})  //frist find by id then below destroy delete
    if (product.length>0){
      await Product.destroy({where:{id:id}})
      res.status(200).json({message:"Product is successfully delete", data:product})
    }
  }
}

export default new productController();
