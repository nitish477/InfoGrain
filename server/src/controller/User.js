import asyncHandler from "express-async-handler";
import generateToken from './../middelwares/generateToken.js';
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import TokenBlacklist from "../models/Logout.js";

const signup = asyncHandler(async (req, res) => {
  const { name, email, password, address,mobile ,pic} = req.body;

  if (!name || !email || !password || !mobile) {
    return res.status(400).send({ message: "Please fill out all fields!" });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).send({ message: "User Already Exist" });
  }
  const mobileExist = await User.findOne({ mobile });
  if (mobileExist) {
    return res.status(400).send({ message: "Number Already Exist" });
  }
  const user = await User.create({
    name,
    email,
    password,
    address,
    mobile,pic
  });
  if (user) {
    res.status(201).json({
      success: true,
      data: user,
      message: "Signup SuccessFully",
      token: generateToken(user._id),
    });
  } else {
    res.status(404).send({ message: "Fail to Create a user" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select(
      "name email password address mobile pic"
    );

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        data: user,
        message: "Login Successfully",
        token: generateToken(user._id),
      });
    } else {
      res.status(404).send({ message: "Invalid Email and Password" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getuser = asyncHandler(async (req, res) => {
   const {_id} = req.params
  try {
     const user = await User.findOne({ _id: _id });
     if (!user) {
       res.status(400).json({
        message:"not found"
       });
     }
     res.send(user);
  } catch (error) {
    console.log(error.message);
  }
});

const updateUser = asyncHandler(async (req,res)=>{
  const _id = req.params;
  const { name, email, password, address, mobile, pic } = req.body;

 
 
  const user = await User.updateOne({_id:_id},{$set:{
    name,
    email,
    password,
    address,
    mobile,
    pic,
  }});

    const update= await User.find({ _id: _id });
  if (user) {
    res.status(201).json({
      success: true,
      data: update,
      message: "Update SuccessFully",
    });
  } else {
    res.status(404).send({ message: "Fail to Update a user" });
  }
})

const logout = asyncHandler(async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const expiry = new Date(decoded.exp * 1000);

    await TokenBlacklist.create({ token, expiry });

    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.error("Logout error:", error); 
    res.status(401).json({ message: "Token is not valid" });
  }
});


export { signup, login, getuser, logout, updateUser };
