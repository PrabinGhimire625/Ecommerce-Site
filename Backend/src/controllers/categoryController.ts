import { where } from "sequelize";
import Category from "../database/models/category";
import  {Request, Response} from "express"

class categoryController{
    categoryData=[
        {categoryName: "Electronics"},
        {categoryName: "Groceries"},
        {categoryName: "Food/Beverages"},
        {categoryName: "Communication"},
    ]
    //categorySeeder
    async seedCategory():Promise<void>{
        const datas=await Category.findAll()
        //if category xoin vana create garxa else part
        if(datas.length===0){
            const data=await Category.bulkCreate(this.categoryData) //bulkCreate insert multiple records into a database table in a single operation. 
            console.log("Category sedded successfully")
        }else{
            console.log("Category already seeded")
        }   
    }

    //add category
    async addCategory(req:Request,res:Response):Promise<void>{
        const {categoryName}=req.body
        if(!categoryName){
            res.status(404).json({message : "Please provide categoryName"})
            return
        }else{
            await Category.create({categoryName})
            res.status(200).json({message:"Category is successfully Added"})
        }
    }

    //get category
    async getCategory(req:Request,res:Response):Promise<void>{
        const category=await Category.findAll()
        res.status(200).json({message:"Category is successfully get", data:category})
    }

        //get category
    async fetchSingleCategory(req:Request,res:Response):Promise<void>{
        const id=req.params.id
        const category=await Category.findOne({where:{id:id}})
        res.status(200).json({message:"Category is successfully get", data:category})
    }

    //delete category
    async deleteCategory(req:Request,res:Response):Promise<void>{
        const id=req.params.id
        const category=await Category.findAll({where:{id:id}})
        if (category.length>0){
            await Category.destroy({where:{id:id}})
            res.status(200).json({message:"Category deleted!"})
        }
    }

    //update category
    async updatecategory(req:Request, res:Response):Promise<void>{
        const id=req.params.id
        const {categoryName}=req.body
       const category= await Category.update({categoryName},{where:{id:id}})
       res.status(200).json({message:"Category is successfully updated",data:category})
    }
}

export default new categoryController()