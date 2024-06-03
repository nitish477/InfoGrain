import express from "express"
import { getuser, login, logout, signup } from "../controller/User.js"
import protect from "../middelwares/auth.js"
const route = express.Router()

route.post("/login",login)
route.post("/signup",signup)
route.get("/me/:_id",protect,getuser)
route.post("/logout",protect,logout)
export default route;
