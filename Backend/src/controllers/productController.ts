import { Request, Response } from "express";
import Product from "../database/models/product";
import { AuthRequest } from "../middleware/authMiddleware";
import { model } from "mongoose";
import User from "../database/models/userModel";
import Category from "../database/models/category";
import { where } from "sequelize";
import fs from "fs"

class productController {
  //add the product
  async addProduct(req: AuthRequest, res: Response): Promise<void>{
    const userId=req.user?.id  //from the authMiddleware req.user to find the adminId
    const { productName, productDescription, productPrice, productTotalStockQty,categoryId } = req.body;
    let fileName;
    if (req.file) {
      fileName=req.file.filename
    } else {
      fileName = "data:image/jpeg;base64,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";
    }
    try {
      const product = await Product.create({
        productName,
        productDescription,
        productPrice,
        productTotalStockQty,
        productImageUrl: fileName,
        userId:userId,  //left ko userId database ko fk, 
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
    console.log(id)
    const data=await Product.findOne({
      where:{id:id},
      include: [
        {
          model:User,
          attributes:['id','email','username']
        },{
          model:Category,
          attributes:['id','categoryName']
        }
      ]
    })
    if(!data){
      res.status(404).json({message:"No product with that id"})
    }else{
    res.status(200).json({message:"Single product is successfully fetched", data})
  }
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

  //update the product
    async updateProduct(req: Request, res: Response): Promise<void> {
      try {
          const id = req.params.id;
          const { productName, productPrice, productDescription,productTotalStockQty } = req.body;

          const oldData = await Product.findByPk(id);
          if (!oldData) {
              res.status(404).json({ message: "Product not found" });
              return 
          }
          let fileName = oldData.productImageUrl;
          if (req.file) {
              const oldImagePath = oldData.productImageUrl;
              const localHostUrlLength = "http://localhost:3000/".length;
              const newOldImagePath = oldImagePath.slice(localHostUrlLength);
              // Delete the old image
              console.log("Path to delete:", `src/uploads/${newOldImagePath}`);

              fs.unlink(`src/uploads/${newOldImagePath}`, (err) => {
                  if (err) {
                      console.error("Error deleting old image:", err);
                  } else {
                      console.log("Old image deleted successfully");
                  }
              });
              fileName = "http://localhost:3000/" + req.file.filename;  // Set new image URL
          }
          // Update the product in the database
          const [products] = await Product.update({productName,productPrice,productDescription,productTotalStockQty, productImageUrl: fileName},{ where: { id: id } });
          if (products > 0) {
              const updatedProduct = await Product.findByPk(id);
              res.status(200).json({ message: "Successfully updated the product", data: updatedProduct });
          } else {
              res.status(404).json({ message: "Product not found or no changes made" });
          }
      } catch (error) {
          console.error("Error updating product:", error);
          res.status(500).json({ message: "Internal server error" });
      }
  }
}

export default new productController();
