import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Navbar.css";
import axios from "axios";
import { State } from "../Context/Provider";

const Navbar = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const [token, setToken] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const tok = JSON.parse(localStorage.getItem("token"));
    if (tok) {
      setToken(tok);
    }
  }, []);

  

   const logout = async()=>{
       try {
          await axios.post("/logout",null,{
            headers:{"Authorization":`Bearer ${token}`}
          })
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login")
       } catch (error) {
        console.log(error.message);
       }
   }
  
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Nitish Mart</Link>
        </div>
        <nav className={`navbar-menu ${isHamburgerOpen ? "active" : ""}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/cart" className="navbar-link">
                <ShoppingCartIcon className="icon" /> Cart
              </Link>
            </li>
            {token ? null : (
              <>
                <li>
                  <Link to="/login" className="navbar-link">
                    <LoginIcon className="icon" /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="navbar-link">
                    <PersonIcon className="icon" /> Signup
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile" className="navbar-link">
                <PersonIcon className="icon" /> Profile
              </Link>
            </li>
            {token && (
              <li>
                <button
                  className="navbar-link"
                  style={{
                    background: "none",
                    padding:"0",
                    fontSize:"16px"
                    
                  }}
                  onClick={logout}
                >
                  <LogoutIcon className="icon" /> Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
        <div
          className="navbar-hamburger"
          onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
        >
          <MenuIcon className="icon" />
        </div>
        <Outlet />
      </div>
    </header>
  );
};

export default Navbar;
