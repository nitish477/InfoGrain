import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Rating,
} from "@mui/material";

const ProductCard = ({ product, checkoutHandler }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <Button
          size="small"
          color="primary"
          onClick={() => checkoutHandler(product.price)}
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
