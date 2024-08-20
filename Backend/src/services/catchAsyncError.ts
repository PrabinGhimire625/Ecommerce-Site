import { Request, Response} from "express";
//handle try and catch
const errorHandler=(fn:Function)=>{
    return (req:Request,res:Response)=>{
        fn(req,res)
        .catch((err:Error)=>{
            console.log(err)

            return res.status(500).json({
                message:"Internal server error",
                errorMessage:err.message
            })
        })
    }
}
export default errorHandler




