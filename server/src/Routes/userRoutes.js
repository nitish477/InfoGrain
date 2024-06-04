import express from "express"
import { getuser, login, logout, signup, updateUser } from "../controller/User.js"
import protect from "../middelwares/auth.js"
import { checkout, paymentVerification } from "../controller/Payment.js"
const route = express.Router()

route.post("/login",login)
route.post("/signup",signup)
route.get("/me/:_id",protect,getuser)
route.put("/update/:_id",protect,updateUser)
route.post("/logout",protect,logout)
route.post("/checkout",checkout);
route.post("/paymentverification",paymentVerification);
export default route;
