import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios  from 'axios';

const ProfileCard = styled(Card)({
  maxWidth: 400,
  margin: "auto",
  marginTop: 50,
  padding: 20,
});

const ProfileAvatar = styled(Avatar)({
  width: 80,
  height: 80,
  margin: "auto",
  marginBottom: 20,
  cursor: "pointer",
  position: "relative",
});

const ProfileTitle = styled(Typography)({
  textAlign: "center",
  marginBottom: 20,
});

const InfoItem = styled(Grid)({
  marginBottom: 10,
});

const EditButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: 20,
});

const HiddenInput = styled("input")({
  display: "none",
});

const UserProfile = () => {
  const [pic, setPic] = useState("");
  const userID = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const postDetails = (pics) => {
    if (pics === undefined) {
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dbqdqof8u");
      fetch("https://api.cloudinary.com/v1_1/dbqdqof8u/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.url) {
            setPic(data.url.toString());
          } else {
            console.log("Image URL is undefined in the Cloudinary response.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    pic: "",
  });


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = () => {
    setOpen(false);
    setUserInfo({ ...userInfo,  pic });
    // You can add additional logic here to save the updated information
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      postDetails(file);
    }
  };


  const updateData = async ()=>{
    //  setUserInfo({ ...userInfo, pic });
    const id = userID._id
    try {
       const res = await axios.put(
         `http://localhost:5000/api/update/${id}`,
         {userInfo,pic},
         {
           headers: { Authorization: `Bearer ${token}` },
         }
       );
      if(res?.status===201){
        console.log(res?.data?.message);
      }
    } catch (error) {
      
    }
     setOpen(false);
  }

  const getUser = async ()=>{
    const id= userID?._id
    try {
         const res = await axios.get(`http://localhost:5000/api/me/${id}`, {
           headers: { Authorization: `Bearer ${token}` },
         });
        setUserInfo(res?.data);
        console.log(res?.data);
    } catch (error) {
        console.log(error.mesage);
    }


  }

  useEffect(()=>{
    getUser()
  },[])

   

  return (
    <Container>
      <ProfileCard>
        <ProfileAvatar alt={userInfo.name} src={pic || userInfo.pic}>
          <IconButton
            color="primary"
            component="label"
            style={{ position: "absolute", bottom: 0, right: 0 }}
          >
            <PhotoCamera />
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              name="pic"
            />
          </IconButton>
        </ProfileAvatar>
        <ProfileTitle variant="h5">{userInfo.name}</ProfileTitle>
        <CardContent>
          <Grid container spacing={2}>
            <InfoItem item xs={12}>
              <Typography variant="body1">
                <strong>Address:</strong> {userInfo.address}
              </Typography>
            </InfoItem>
            <InfoItem item xs={12}>
              <Typography variant="body1">
                <strong>Phone Number:</strong> {userInfo.mobile}
              </Typography>
            </InfoItem>
            <InfoItem item xs={12}>
              <Typography variant="body1">
                <strong>Email:</strong> {userInfo.email}
              </Typography>
            </InfoItem>
          </Grid>
          <EditButtonContainer>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Edit Profile
            </Button>
          </EditButtonContainer>
        </CardContent>
      </ProfileCard>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={userInfo.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            name="address"
            value={userInfo.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            name="mobile"
            value={userInfo.mobile}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={updateData} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfile;
