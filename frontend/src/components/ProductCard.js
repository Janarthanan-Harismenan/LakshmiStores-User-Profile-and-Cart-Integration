import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      className="col-sm-12 col-md-6 col-lg-3 my-3"
      style={{ fontFamily: "sans-serif" }}
    >
      <div
        className="card p-3 rounded"
        style={{
          backgroundColor: "#FFFFFF", // White background
          color: "#333", // Gray text
        }}
      >
        <img
          className="card-img-top mx-auto"
          src={product.images[0].image}
          alt={product.name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link
              to={"product/" + product._id}
              style={{ color: "#333", textDecoration: "none" }} // Gray text, no underline
            >
              {product.name}
            </Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{
                  width: `${(product.ratings / 5) * 100}%`,
                  // backgroundColor: "#87CEFA", // Light blue for filled rating
                }}
              ></div>
            </div>
            <span id="no_of_reviews" style={{ color: "#333" }}>
              ({product.numberOfReviews} Reviews)
            </span>
          </div>
          <p className="card-text" style={{ color: "#333" }}>
            {product.price} LKR
          </p>
          <Link
            to={"product/" + product._id}
            id="view_btn"
            className="btn btn-block"
            style={{
              backgroundColor: "#87CEFA", // Light blue background
              color: "#FFFFFF", // White text
              border: "1px solid #87CEFA", // Light blue border
              fontFamily: "sans-serif", // Ensuring font consistency
            }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
