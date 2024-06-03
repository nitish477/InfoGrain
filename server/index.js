import dotenv from "dotenv"
dotenv.config()
import {connectDB} from "./src/db/connect.js"
import { app } from "./src/app.js"
import Razorpay from "razorpay";




connectDB()
   .then(()=>{
    app.listen(process.env.PORT||5000,()=>{
       console.log("server Start");
    })
   })
   .catch((err)=>{
    console.log("connect fail"+err);
   })

   export const instance = new Razorpay({
     key_id: process.env.RAZORPAY_API_KEY,
     key_secret: process.env.RAZORPAY_APT_SECRET,
   });

   