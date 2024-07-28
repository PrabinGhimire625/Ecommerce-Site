import  express,{Application,Request,Response} from "express"
const app:Application=express()
import './database/connection'  //for database always import
import categoryController from "./controllers/categoryController"
import dotenv from "dotenv"
dotenv.config()
const port=process.env.PORT

app.use(express.json())
app.use(express.urlencoded())

//seeder create the admin frist when the program is start  (Comment this part before showing the relation between the table)
import adminSeeder from "./adminSeeder"
adminSeeder()                      //call the adminSeeder
categoryController.seedCategory()  //call seedCategory

//routes
import userRoute from "./routes/userRoute"
import productRoutes from "./routes/productRoutes"
import categoryRoutes from "./routes/categoryRoutes"
import cartRoutes from "./routes/cartRoutes"

app.use("/",userRoute)
app.use("/admin/product",productRoutes)
app.use("/admin/category",categoryRoutes)
app.use("/customer/cart",cartRoutes)

app.listen(port,()=>{
    console.log("Server has started at port",port)
})