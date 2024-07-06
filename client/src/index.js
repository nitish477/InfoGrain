import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './view/Home/Home';
import Login from './view/auth/Login';
import Signup from './view/auth/Signup';
import PaymentSuccess from './view/PaymentSuccess/PaymentSuccess';
import { Provider } from 'react-redux';
import Profile from './view/Profile/Profile';
import Details from './view/Details/Details';
import store from './Redux/Store/Store';
import Cart from './view/Cart/Cart';

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
    element: <PaymentSuccess />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/details/:id",
    element: <Details/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
]);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

