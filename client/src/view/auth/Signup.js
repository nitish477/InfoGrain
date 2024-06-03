import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import "./auth.css"
import axios from "axios"
function Signup() {
  const [Userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });
  const navigate = useNavigate()
  const getToken = JSON.parse(localStorage.getItem("token"));
  const handel = (e)=>{
     const {name,value}=e.target;

       setUserdata((prev)=>({
          ...prev,
          [name]:value
       }))
    }

    const signup = async ()=>{
      try {
         const res = await axios.post("/signup",Userdata)
       if(res.status===201){
         alert(res?.data?.message);
         navigate("/")
       }
       else{
        alert(res?.data?.message);
       }
      } catch (error) {
         console.log(error.message);
      }
    }
 useEffect(() => {
   if (getToken) {
     navigate("/");
   }
 }, []);
  return (
    <>
      <div className='body'>
        <div className="wrapper signUp">
          <div className="illustration">
            <img src="https://source.unsplash.com/random" alt="illustration" />
          </div>
          <div className="form">
            <div className="heading">CREATE AN ACCOUNT</div>
            <form>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  name="name"
                  onChange={handel}
                />
              </div>
              <div>
                <label htmlFor="email">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your mail"
                  name="email"
                  onChange={handel}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter you password"
                  name="password"
                  onChange={handel}
                />
              </div>
              <div>
                <label htmlFor="mobile">Mobile No.</label>
                <input
                  type="number"
                  id="mobile"
                  placeholder="Enter you Mobile No."
                  name="mobile"
                  onChange={handel}
                />
              </div>

              <button type="button" onClick={signup}>
                Signup
              </button>
              <h2 align="center" class="or">
                OR
              </h2>
            </form>
            <p>
              Have an account ? <Link to="/login"> Login </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup