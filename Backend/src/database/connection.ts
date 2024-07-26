import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv"
import User from "./models/userModel";
import Product from "./models/product";
import Category from "./models/category";
dotenv.config()
const sequelize=new Sequelize({
    database:process.env.DB_NAME,
    dialect:'mysql',
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:Number(process.env.DB_HOST),
    models:[__dirname+ "/models"]
})

sequelize.authenticate()
.then(()=>{
    console.log("Successfully connected to the mysql database")
})
.catch((err)=>{
    console.log(err)
})

sequelize.sync({force:false})
.then(()=>{
    console.log("Synced!!")
})

//relationship between the user and products ..{to find which admin add the product}
User.hasMany(Product)  
Product.belongsTo(User)

//relatonship between the product and the category
Category.hasOne(Product,{foreignKey : 'categoryId'})  //if you want to give the name of the foreignkey..but by default also present
Product.belongsTo(Category,{foreignKey:'categoryId'})


export default sequelize