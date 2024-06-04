import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './view/Home/Home';
import Login from './view/auth/Login';
import Signup from './view/auth/Signup';
import PaymentSuccess from './view/PaymentSuccess/PaymentSuccess';
import Provider from './component/Context/Provider';
import Profile from './view/Profile/Profile';


const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/paymentsuccess",
    element:<PaymentSuccess/>
  },
  {
    path:"/profile",
    element:<Profile/>
  }
]);
root.render(
  <Provider>
    <RouterProvider router={router} />
  </Provider>
);

