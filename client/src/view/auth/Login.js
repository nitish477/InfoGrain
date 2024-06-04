import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";
function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate= useNavigate()
  const getToken = JSON.parse(localStorage.getItem("token"));

  const handel = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = async ()=>{
    try {
       const res= await axios.post("/login",loginInfo) 
       if(res?.status===200){
        alert(res?.data?.message)
         navigate("/")
          localStorage.setItem("token", JSON.stringify(res?.data?.token));
          localStorage.setItem("user", JSON.stringify(res?.data?.data));
       }
    } catch (error) {
        console.log(error?.message);
    }
  }

  useEffect(()=>{
    if(getToken){
        navigate("/")
    }
  },[])
  return (
    <>
      <div className="body">
        <div className="wrapper signIn">
          <div className="illustration">
            <img src="https://source.unsplash.com/random" alt="illustration" />
          </div>
          <div className="form">
            <div className="heading">LOGIN</div>
            <form>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
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
                  onChange={handel}
                  name="password"
                />
              </div>
              <button type="button" onClick={login}>
                Login
              </button>
            </form>
            <p>
              Don't have an account ? <Link to="/signup"> Sign In </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
