import asyncHandler from "express-async-handler";
import addtocart from "../models/AddToCart.js";

const addtocarts = asyncHandler(async (req, res) => {
  const { Id, Name, Price, Quantity, Image, User } = req.body;

  if (!Id || !Name || !Price || !Quantity) {
    return res.status(400).json({ success: false, message: "Please fill out all fields!" });
  }

  try {
    // Check if the product already exists in the cart for the user
    let cartItem = await addtocart.findOne({ User, Id });

    if (cartItem) {
      // If item exists, update its quantity
      cartItem.Quantity += Quantity;
      await cartItem.save();
    } else {
      // If item does not exist, create a new entry
      cartItem = new addtocart({
        User,
        Id,
        Price,
        Quantity,
        Image,
        Name,
      });
      await cartItem.save();
    }

    res.json({
      success: true,
      data: cartItem,
      message: 'Product added to cart',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const getCart = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  try {
    const getCarts = await addtocart.find({ User: _id }).populate("User");

    res.json({
      success: true,
      data: getCarts,
      message: "Cart fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const removeCart = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  await addtocart.deleteOne({ _id: _id })
      .then(() => {
          res.json({
              success: true,
              message: "Deleted Successfully",
          });
      })
      .catch((error) => {
          res.status(500).json({
              success: false,
              message: "Failed to delete item",
              error: error.message, 
          });
      });
});




export { addtocarts, getCart ,removeCart};
