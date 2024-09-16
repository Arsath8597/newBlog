import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "../route/userRoute.js"
import authRoute from "../route/authRoute.js"
import cors from 'cors';

dotenv.config();

mongoose.connect("mongodb+srv://arsath:123@cluster0.och8k.mongodb.net/blog")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Database not connected", err);
  });

const app =express();
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));

app.use(express.json())


app.listen(4000,()=>{
    console.log("server listening on port 4000")
})

app.use("/api/user", userRoute); 
app.use("/api/auth", authRoute); 

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message =err.message || "internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})
