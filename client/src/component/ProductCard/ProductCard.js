import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, checkoutHandler }) => {
  return (
    <div className="product-card spacing">
      <div className="badge"> {product.brand} </div>
      <div className="product-thumb">
        <img src={product.thumbnail} alt="product-img" />
      </div>
      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <h4>{product.title}</h4>
        <p> {product.description} </p>
        <div className="product-bottom-details">
          <div className="product-price">
            <small>{product.discountPercentage}% ⬇</small>${product.price}
          </div>
        </div>
        <div className="product-links">
          <Link to={`/details/${product.id}`}>
            <button>View</button>{" "}
          </Link>
          <button
            onClick={() => {
              checkoutHandler(product.price);
            }}
          >
            Buy Now
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
