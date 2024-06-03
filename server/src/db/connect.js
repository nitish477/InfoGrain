import mongoose from "mongoose";
import asyncHandeler from "express-async-handler"

const connectDB = asyncHandeler(async()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGODB_URI)
       if(conn){
        console.log(
          `Database Connected SuccessFully on ${conn.connection.host}`
        );
       } 
    } catch (error) {
        console.log("connection Fail!"+error);
    }
})

export {connectDB}