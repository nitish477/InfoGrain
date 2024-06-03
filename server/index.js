import dotenv from "dotenv"
dotenv.config()
import {connectDB} from "./src/db/connect.js"
import { app } from "./src/app.js"


connectDB()
   .then(()=>{
    app.listen(process.env.PORT||5000,()=>{
       console.log("server Start");
    })
   })
   .catch((err)=>{
    console.log("connect fail"+err);
   })
   