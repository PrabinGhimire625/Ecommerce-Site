import Category from "../database/models/category";

class categoryController{
    categoryData=[
        {categoryName: "Electronics"},
        {categoryName: "Groceries"},
        {categoryName: "Food/Beverages"},
        {categoryName: "Communication"},
    ]

    async seedCategory():Promise<void>{
        const datas=await Category.findAll()
        //if category xoin vana create garxa else part
        if(datas.length==0){
            const data=await Category.bulkCreate(this.categoryData)
            console.log("Category sedded successfully")
        }else{
            console.log("Category already seeded")
        }   
    }
}
export default new categoryController()