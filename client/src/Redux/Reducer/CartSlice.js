import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCarts = createAsyncThunk(
  'Carts/fetchCarts',
  async (_, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const response = await axios.get(`http://localhost:5000/api/fetchcart/${user?._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.data; // Assuming response.data.data is an array of cart items
    } catch (error) {
      console.error('Error fetching carts:', error.message);
      throw error;
    }
  }
);



const cartSlice = createSlice({
  name: 'Carts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
