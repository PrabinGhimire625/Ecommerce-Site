import User from "./database/models/userModel"
import bcrypt from "bcrypt"
//promise return
const adminSeeder=async():Promise<void>=>{
    const [data]=await User.findAll({where:{email:"prabinghimire625@gmail.com"}})
    //if not admin then create the admin
    if(!data){
        await User.create({
            username:"prabin",
            email: "prabinghimire625@gmail.com",
            password: bcrypt.hashSync("prabin", 10),
            role:"admin"
        })
        console.log("Admin credentials seeeded successfully!")  
    }else{
        console.log("Admin credentials already seeded")
    }
}

export default adminSeeder