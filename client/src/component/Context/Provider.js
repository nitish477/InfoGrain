import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  
  const [Cart, setCart] = useState([]);
  const [user,setUser]=useState();
  const token = JSON.parse(localStorage.getItem("token"))
  const userID = JSON.parse(localStorage.getItem("user"))
 
  



  return (
    <Context.Provider
      value={{
       Cart,
       setCart,
       user
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const State = () => {
  return useContext(Context);
};

export default Provider;
