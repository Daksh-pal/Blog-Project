import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt, { hash } from 'bcrypt'

export const register = async (req,res) => {
    
    const {firstName , lastName, email , password} = req.body;
    
    try {
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({error : "Please fill all the fields"});
        }
        
        
        if (!validateEmail(email)) {
            console.log("Checkpoint 3");
            return res.status(400).json({ error: "Please enter a valid email address" });
        }
        
        const user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({Error : "User already registered."})
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        
        const newUser = new User({firstName,lastName,email,password: hashedPassword});
        await newUser.save();

        const token = generateToken(newUser._id);

        return res.status(200).json({Message : "User Registered Successfully" , token});

    } catch (error) {

        console.log("Inside catch  block in register function")
        return res.status(500).json({Error : error});

    }
}


export const login = async (req,res) => {

    const {email , password} = req.body;
    
    try {
        if(!email || !password){
            return res.status(400).json({error : "Please fill all the fields"});
        }
        
        
        if (!validateEmail(email)) {
            console.log("Checkpoint 3");
            return res.status(400).json({ error: "Please enter a valid email address" });
        }
        
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({Error : "No such User is registered."})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid Password" });
        }

        const token = generateToken(user._id);

        return res.status(200).json({Message : "User Logged in Successfully" , token});

    } catch (error) {

        console.log("Inside catch  block in register function")
        return res.status(500).json({Error : error});

    }
}

const generateToken =  (id) => {
    return jwt.sign({id} , process.env.JWT_KEY , {expiresIn : '1h'})
}

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
