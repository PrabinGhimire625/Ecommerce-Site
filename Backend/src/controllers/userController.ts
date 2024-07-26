import User from "../database/models/userModel";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
class AuthController{
    //register user
   public static async registerUser(req:Request,res:Response):Promise<void>{
        const {username,email,password,role}=req.body
        const hashedPassword=bcrypt.hashSync(password,10)
        await User.create({username,email,password:hashedPassword,role:role})
        res.status(200).json({message:"User is succcessfully registered!"})
    }

    //login user
    public static async loginUser(req:Request,res:Response):Promise<void>{
        const {email,password}=req.body;
        const [user]=await User.findAll({where:{email:email}})  //findAll return in array so [user] destructure
        if(!user){
            res.status(404).json({message:"No user with that email is found"})
            return
        }
        const isMatched=bcrypt.compareSync(password,user.password)
        if(!isMatched){
            res.status(403).json({message:"Password is not valid "})
            return
        }
        //generate token after matched the password
        const token=jwt.sign({id:user.id},process.env.SECRET_KEY as string,{expiresIn:"20d"})
        res.status(200).json({message:"Successfully login",data:token})       
    }
}
export default AuthController