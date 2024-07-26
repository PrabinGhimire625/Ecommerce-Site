import { Request,Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel";

//req.user obj ko type dina
export interface AuthRequest extends Request{
    user?:{
        id:string,
        username:string,
        email:string,
        password:string
        role:string
    }
}

//role type
export enum Role{
    Admin='admin',
    Customer="customer"
}

class AuthMiddleware{
    //authentication
   async isAuthenticated(req:AuthRequest,res:Response,next:NextFunction):Promise<void>{
    //get token from to verify the user is login or not
    //req header, res header  ::authorization vanako headers ko key ho
    const token=req.headers.authorization
    if(!token){
        res.status(403).json({message:"Token not provided"})
        return
    }
    console.log(token)
     //payload ma j data xa tyo nai auxa decoded mas
    jwt.verify(token,process.env.SECRET_KEY as string,async(err,decoded:any)=>{
        if(err){
            res.status(403).json({message :"Invalid token"})
            return
        }else{
           try {
            const userData= await User.findByPk(decoded.id)
            if(!userData){
                res.status(404).json({message:"No user with that token"})
                return
            }
           req.user=userData  
           next()   
           } catch (error) {
            res.status(500).json({message : "Something went wrong"})
           }
        }
    })
    }

    //roles
    restrictTo(...roles:Role[]){
        return (req:AuthRequest, res:Response, next:NextFunction)=>{
            let userRole=req.user?.role as Role
            console.log(userRole)
            if(!roles.includes(userRole)){
                res.status(403).json({message:"You do not have the permission"})
                return
            }else {
                next()
            }
        }
    }
}

export default new AuthMiddleware()