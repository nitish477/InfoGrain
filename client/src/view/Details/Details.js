import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rating, Button } from "@mui/material";
import "./Detail.css";
import { useDispatch } from "react-redux";
function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
   const dispatch = useDispatch()
  const getProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddToCart = async()=>{
     try {
      const user = JSON.parse(localStorage.getItem("user"))
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.post("/addtocart",{
        User:user._id,
        Id:product?.id,
        Price:product?.price,
        Quantity:quantity,
        Image:product.thumbnail,
        Name:product.title
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(res);
      if(res?.data?.success == true){
         alert(res?.data?.message)
         window.location.href=("/cart")

      }
     } catch (error) {
       console.log(error.message);
     }
  }

  useEffect(() => {
    getProduct();
  }, []);

  const sortedReviews = product?.reviews?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

    const checkoutHandler = async (amount) => {
      const {
        data: { key },
      } = await axios.get("http://www.localhost:5000/api/getkey");
      const {
        data: { order },
      } = await axios.post("http://localhost:5000/api/checkout", {
        amount,
      });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Nitish",
        description: "Tutorial of RazorPay",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:5000/api/paymentverification",
        prefill: {
          name: "Nitish Kumar",
          email: "krnitish540@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    };

  return (
    <>
      <Navbar />
      <div className="container-main">
        {product?.images?.map((obj, i) => (
          <img key={i} src={obj} alt="Product" className="details-img" />
        ))}
      </div>
      <div className="main">
        <div className="sub-main">
          <h1>{product?.title}</h1>
          <p className="product-price">
            <small>{product?.discountPercentage}%⬇</small> ${product?.price}
          </p>
          <p>{product.description}</p>
          <div className="product-details">
            <div className="product-detail-item">
              <strong>Availability Status:</strong>{" "}
              {product?.availabilityStatus}
            </div>
            <div className="product-detail-item">
              <strong>Rating:</strong>
              <Rating name="read-only" value={product?.rating} readOnly />
            </div>
            <div className="product-detail-item">
              <strong>Return Policy:</strong> {product?.returnPolicy}
            </div>
            <div className="product-detail-item">
              <strong>Stock:</strong> {product?.stock}
            </div>
          </div>
        </div>
        <div className="sub-main">
          <div className="quantity-div">
            <button
              className="quantity-btn"
              onClick={() => {
                if (quantity === 5) {
                  alert("You can order only 5 quantity");
                  return;
                }
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>{" "}
            {quantity}{" "}
            <button
              className="quantity-btn"
              onClick={() => {
                if (quantity === 1) {
                  alert(`You can't order less than one`);
                  return;
                }
                setQuantity(quantity - 1);
              }}
            >
              -
            </button>
          </div>
          <div className="button-group">
            <button
              variant="contained"
              color="primary"
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            {/* <button
              onClick={()=>{checkoutHandler(product?.price);}}
              className="buy-now-btn"
            >
              Buy Now
            </button> */}
          </div>
        </div>
      </div>
      <div className="review-section">
        <h2>Reviews</h2>
        {sortedReviews?.length > 0 ? (
          sortedReviews.map((review, index) => (
            <div key={index} className="review-item">
              <p>
                <strong>Reviewer:</strong> {review.reviewerName} (
                {review.reviewerEmail})
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(review.date).toLocaleDateString()}
              </p>
              <Rating name="read-only" value={review.rating} readOnly />
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </>
  );
}

export default Details;
