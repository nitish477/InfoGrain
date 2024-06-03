import express from "express"
import route from "./Routes/userRoutes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/health",async(req,res)=>{
    res.send("ok")
})

app.use("/api",route)
export {app}