import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//register api
export const signup=async(req,res,next)=>{
try {
    const {username,email,password}=req.body;
    const hashPAssword=bcrypt.hashSync(password,10)
    const newUser= new User({username,email,password:hashPAssword})
    await newUser.save()
    res.status(201).json({ 
      message:"user Add succsfully"
      
    })
} catch (error) {
    next(errorHandler(
        500,"something went wrong"
    ))
}

}

//login api
export const signin =async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        const validUser=await User.findOne({email});
        if(!validUser){
            next(errorHandler(401,"User Not Find"))
        }
        const validPassword=bcrypt.compareSync(password,validUser.password)
        if(!validPassword){
            next(errorHandler(401,"User Not Find"))
        
        }
        const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:hashPAssword,...rest}=validUser._doc;
        
        const expiryDate=new Date(Date.now()+3600000);
        res.cookie("access_token",token,{httpOnly:true,expires:expiryDate})
        .status(200)
        .json(rest)
       
    } catch (error) {
        next(errorHandler())
    }
}