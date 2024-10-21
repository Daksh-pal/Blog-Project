import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async (req,res) => {
    const {firstName , lastName, email , password} = req.body;
    console.log("Checkpoint 1");
    
    try {
        console.log("Checkpoint 2");
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({error : "Please fill all the fields"});
        }
        
        console.log("Checkpoint 3");
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // if(!regex.test(email)){
        //     console.log("Checkpoint 4");
        //     return res.status(400).json({error : "Please enter valid Email"});
        // }
        
        console.log("Checkpoint 5");
        const user = await User.findOne({email});
        
        if(user){
            console.log("Checkpoint 6");
            return res.status(400).json({Error : "User already registered."})
        }
        console.log("Checkpoint 7");
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        const newUser = new User({firstName,lastName,email,password: hashedPassword});
        await newUser.save();
        const token = generateToken(newUser._id);
        return res.status(200).json({Message : "User Registered Successfully" , token});
    } catch (error) {
        console.log("Inside catch  block")
        return res.status(500).json({Error : error});
    }
}

const generateToken = async (id) => {
    const token = jwt.sign(id , process.env.JWT_KEY , {expiresIn : '1h'})
    return token;
}