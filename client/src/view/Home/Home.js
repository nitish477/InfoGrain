import React, { useEffect } from 'react';
import Navbar from '../../component/Navbar/Navbar';
import axios from 'axios';
import ProductCard from '../../component/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/Reducer/Reducer';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

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

  const addtocart = async(id)=>{
    const product = products.find((p)=>p.id === id);
    try {
     const user = JSON.parse(localStorage.getItem("user"))
     const token = JSON.parse(localStorage.getItem("token"));
     const res = await axios.post("/addtocart",{
       User:user._id,
       Id:product?.id,
       Price:product?.price,
       Quantity:1,
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

  let content;

  if (productStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (productStatus === 'succeeded') {
    content = products.map((product, index) => (
      <ProductCard key={index} product={product} addtocart={addtocart} />
    ));
  } else if (productStatus === 'failed') {
    content = <p>{error}</p>;
  }



  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        {content}
      </div>
    </>
  );
}

export default Home;
