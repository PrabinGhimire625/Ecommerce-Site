import  express,{Application,Request,Response} from "express"
const app:Application=express()
import './database/connection'
import categoryController from "./controllers/categoryController"
import dotenv from "dotenv"
dotenv.config()
const port=process.env.PORT

app.use(express.json())
app.use(express.urlencoded())

//call the adminSeeder
import adminSeeder from "./adminSeeder"
adminSeeder()

//call seedCategory
categoryController.seedCategory()

//user routes
import userRoute from "./routes/userRoute"
app.use("/",userRoute)

//product routes
import productRoutes from "./routes/productRoutes"
app.use("/admin/product",productRoutes)

app.listen(port,()=>{
    console.log("Server has started at port",port)
})