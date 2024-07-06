import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, TextField, RadioGroup, FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { fetchCarts } from '../../Redux/Reducer/CartSlice'; // Correct import path
import Navbar from '../../component/Navbar/Navbar';
import axios from 'axios';

const Cart = () => {
  const cartItems = useSelector((state) => state.Carts.items);
  const cartStatus = useSelector((state) => state.Carts.status);
  const error = useSelector((state) => state.Carts.error);
  const dispatch = useDispatch();
  
  const [shippingOption, setShippingOption] = useState('standard');
  const [openCheckout, setOpenCheckout] = useState(false);
  const [address, setAddress] = useState('');
  const [user, setUser] = useState({});
  const userID = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const shippingPrices = {
    standard: 5,
    fast: 10,
    oneDay: 20,
  };

  useEffect(() => {
    if (cartStatus === 'idle') {
      dispatch(fetchCarts());
    }
    // Fetch user details
    const fetchUserDetails = async () => {
      const id = userID?._id;
      try {
        const res = await axios.get(`http://localhost:5000/api/me/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res?.data);
        setAddress(res?.data?.address);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserDetails();
  }, [cartStatus, dispatch]);

  const handleShippingChange = (event) => {
    setShippingOption(event.target.value);
  };

  const handleCheckout = () => {
    setOpenCheckout(true);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleUpdateAddress = async () => {
    const id = userID._id;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/update/${id}`,
        { address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res?.status === 201) {
        alert('Address updated successfully');
        setUser((prevUser) => ({ ...prevUser, address }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceOrder = () => {
    // Implement order placement logic here
    alert('Order placed successfully!');
    setOpenCheckout(false);
  };

  const RemoveCart = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const response = await axios.delete(`http://localhost:5000/api/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(response);

      if (response?.status === 200) { 
        window.location.reload();
      }

    } catch (error) {
      console.error('Error fetching carts:', error.message);
      throw error;
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0) + shippingPrices[shippingOption];

  let content;

  if (cartStatus === 'loading') {
    content = <Typography variant="body1">Loading...</Typography>;
  } else if (cartStatus === 'succeeded') {
    content = cartItems.map((item) => (
      <Card key={item.id} sx={{ marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <CardMedia
              component="img"
              height="100"
              image={item.Image}
              alt={item.Name}
            />
          </Grid>
          <Grid item xs={6}>
            <CardContent>
              <Typography variant="h6" component="div">
                {item.Name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                ${item.Price} <br />
                Quantity: {item.Quantity}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={3} container justifyContent="flex-end" alignItems="center">
            <Button variant="contained" color="error" onClick={() => { RemoveCart(item._id) }}>
              Remove
            </Button>
          </Grid>
        </Grid>
      </Card>
    ));
  } else if (cartStatus === 'failed') {
    content = <Typography variant="body1" color="error">{error}</Typography>;
  }

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "3.5rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography variant="h4" gutterBottom>
              Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
              <Typography variant="body1">Your cart is empty</Typography>
            ) : (
              content
            )}
            {cartItems.length > 0 && (
              <Button variant="contained" color="secondary" style={{ marginTop: '10px' }}>
                Clear Cart
              </Button>
            )}
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ border: '1px solid #ddd', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Summary
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Items: {cartItems.reduce((total, item) => total + item.Quantity, 0)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Shipping: 
                  <RadioGroup value={shippingOption} onChange={handleShippingChange}>
                    <FormControlLabel value="standard" control={<Radio />} label="Standard ($5.00)" />
                    <FormControlLabel value="fast" control={<Radio />} label="Fast ($10.00)" />
                    <FormControlLabel value="oneDay" control={<Radio />} label="One Day ($20.00)" />
                  </RadioGroup>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Total Price: ${totalPrice}
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleCheckout}>
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={openCheckout} onClose={() => setOpenCheckout(false)}>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Product Details</Typography>
          {cartItems.map((item) => (
            <Typography key={item.id}>
              {item.Name} - {item.Quantity} x ${item.Price}
            </Typography>
          ))}
          <Typography variant="h6" sx={{ marginTop: 2 }}>User Details</Typography>
          <Typography>Name: {user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Number: {user.mobile}</Typography>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={user.address}
            onChange={handleAddressChange}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateAddress} variant="contained" color="secondary">
            Update Address
          </Button>
          <Button onClick={handlePlaceOrder} variant="contained" color="primary">
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
