import express from "express"
import route from "./Routes/userRoutes.js"
import cors from "cors";
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.get("/health",async(req,res)=>{
    res.send("ok")
})

app.get("/api/getkey", async (req, res) => {
  console.log(process.env.RAZORPAY_APT_SECRET);
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

app.use("/api",route)
export {app}