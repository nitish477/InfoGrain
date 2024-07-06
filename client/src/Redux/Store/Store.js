// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./../Reducer/Reducer"
import CartReducer from "./../Reducer/CartSlice"
const store = configureStore({
  reducer: {
    products: productReducer,
    Carts:CartReducer
  },
});

export default store;
