import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv"
import User from "./models/userModel";
import Product from "./models/product";
import Category from "./models/category";
import Cart from "./models/cart";
import Order from "./models/order";
import OrderDetail from "./models/OrderDetail";
import Payment from "./models/payment";
dotenv.config()

const sequelize=new Sequelize({
    database:process.env.DB_NAME,  //dduphpm
    dialect:'mysql',
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:Number(process.env.DB_HOST),
    models:[__dirname+ "/models"],
    logging: false,  //remove unneccessary query
})

//test the connection to the database
sequelize.authenticate()
.then(()=>{
    console.log("Successfully connected to the mysql database")
})
.catch((err)=>{
    console.log(err)
})

//creating or updating the tables based on your model
sequelize.sync({force:false})  //migrate garxa  (false means it will not drop and recreate tables every time it runs.)
.then(()=>{
    console.log("Synced!!")
})

//relationship between the user and products ..{to find which admin add the product}
User.hasMany(Product,{foreignKey : 'userId'})
Product.belongsTo(User,{foreignKey : 'userId'})

Category.hasOne(Product,{foreignKey : 'categoryId'})
Product.belongsTo(Category,{foreignKey:'categoryId'})

// user-cart relation 
User.hasMany(Cart,{foreignKey:'userId'})
Cart.belongsTo(User,{foreignKey : 'userId'})

// product and category
Product.hasMany(Cart,{foreignKey:'productId'})
Cart.belongsTo(Product,{foreignKey:'productId'})

// order-orderdetail relation
Order.hasMany(OrderDetail,{foreignKey:'orderId'})
OrderDetail.belongsTo(Order,{foreignKey:'orderId'})

// orderdetail-product relation 
Product.hasMany(OrderDetail,{foreignKey:'productId'})
OrderDetail.belongsTo(Product,{foreignKey:'productId'})

//order-payment relation 
Payment.hasOne(Order,{foreignKey:'paymentId'})
Order.belongsTo(Payment,{foreignKey:'paymentId'})

//order-user relation 
User.hasMany(Order,{foreignKey : 'userId'})
Order.belongsTo(User,{foreignKey : 'userId'})

export default sequelize
