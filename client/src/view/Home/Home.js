import React, { useEffect, useState } from 'react'
import Navbar from './../../component/Navbar/Navbar';
import axios from 'axios';
import ProductCard from '../../component/ProductCard/ProductCard';

function Home() {
  const [data,setdata]=useState([])
   const getProduct = async () => {

     try {
       const { data } = await axios.get("https://dummyjson.com/products");
       setdata(data.products);
      
     } catch (error) {
      console.log(error.message);
     }
   };
   useEffect(()=>{
    getProduct()
   },[])

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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        {data.map((product, index) => (
          <ProductCard key={index} product={product} checkoutHandler={checkoutHandler} />
        ))}
      </div>
    </>
  );
}

export default Home