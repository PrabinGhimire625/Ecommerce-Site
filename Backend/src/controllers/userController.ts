import User from "../database/models/userModel";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AuthRequest } from "../middleware/authMiddleware";

class AuthController{
    //register user
   public static async registerUser(req:Request,res:Response):Promise<void>{
        const {username,email,password,role}=req.body
        const hashedPassword=bcrypt.hashSync(password,10)
        await User.create({username,email,password:hashedPassword,role:role})
        res.status(200).json({message:"User is succcessfully registered!"})
    }
    
    //login user
    public static async loginUser(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;  // Extract email and password from request body
        
        // Find the user by email
        const [user] = await User.findAll({ where: { email: email } }); // findAll returns an array so destructure with [user]
        
        if (!user) {
          res.status(404).json({ message: "No user with that email is found" });
          return;
        }
      
        // Compare the provided password with the hashed password stored in the database
        const isMatched = bcrypt.compareSync(password, user.password);
        
        if (!isMatched) {
          res.status(403).json({ message: "Password is not valid" });
          return;
        }

        // Generate token after the password matches
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: "20d" }); // Generate JWT token
      
        // Send response with user data and token
        res.status(200).json({
          message: "Successfully logged in",
          data: {
            token: token,
            user: {
              id: user.id,
              username:user.username,
              email: user.email,  
            }
          }
        });
      }

    //login method2 using the findOne() instead of findAll()
    // async loginUser(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { email, password } = req.body;
    //         const data = await User.findOne({ where: { email: email } });
    //         if (!data) {
    //             res.status(404).json({ message: "User not found" });
    //             return;
    //         }
    //         await bcrypt.compare(password, data.password);
    //         const token = jwt.sign({ id: data.id }, process.env.SECRET_KEY as string);
    //         res.status(200).json({ message: "User successfully logged in", token: token });
    //     } catch (error) {
    //         res.status(500).json({ message: "Internal server error" });
    //     }
    // }

      //fetch single users v.v.i
      public static async fetchUserProfile(req:AuthRequest, res:Response):Promise<void>{
        const id=req.user?.id 
        const users=await User.findOne({where:{id:id}})
        if(users){
            res.status(200).json({message:"User profile is successfully fetched",data:users})
        }else{
            res.status(404).json({message:"Error on fetching user profile", data:[]})
        }
     }   
    

    //fetch all users
    public static async fetchAllUsers(req:AuthRequest, res:Response):Promise<void>{
    const users=await User.findAll()
    if(users.length>0){
        res.status(200).json({message:"User successfully fetched",data:users})
    }else{
        res.status(404).json({message:"Error on fetching user", data:[]})
    }
    }   

    //fetch single users
    public static async fetchSingleUsers(req:Request, res:Response):Promise<void>{
        const id=req.params.id
        const users=await User.findOne({where:{id:id}})
        if(users){
            res.status(200).json({message:"Single User successfully fetched",data:users})
        }else{
            res.status(404).json({message:"Error on fetching user", data:[]})
        }
    }   
    
    //delete the user
    public static async deleteUser(req: AuthRequest, res: Response) {
        const id = req.params.id;
        const user = await User.findAll({ where: { id: id } });
        if (user.length > 0) {
            await User.destroy({ where: { id: id } });
            res.status(200).json({ message: "Successfully deleted the user" });
        }else{
            res.status(500).json({ message: "User not found" });
        }  
    }

    //update user
    public static async updateUser(req:AuthRequest,res:Response){
        const {username,email,password}=req.body
        const id=req.params.id
        const user= await User.findAll({where:{id:id}})
        if(user.length>0){
            await User.update({username,email,password},{where:{id:id}})
            res.status(200).json({message:"User is successfully updated", data:user})
        }else{
            res.status(500).json({ message: "User not found" });
        }
    }
}

export default AuthController
