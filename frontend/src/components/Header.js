import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

function Header({ cartItems = [] }) {
  const fontStyle = { fontFamily: "'Matemasie', sans-serif" };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#333" }}
    >
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "#FFFFFF", fontFamily: "sans-serif" }}
        >
          Lakshmi Stores
        </Link>

        <Search />

        <div className="ml-auto">
          <Link
            to="/cart"
            id="cart"
            className="btn"
            style={{
              backgroundColor: "#87CEFA", // Light blue background
              color: "#FFFFFF", // Dark text color for contrast
              border: "1px solid #87CEFA", // Light blue border
              fontFamily: "sans-serif",
            }}
          >
            <i className="fas fa-shopping-cart"></i> Cart
            <span
              className="badge badge-pill fs-6"
              style={{
                backgroundColor: "#87CEFA",
                color: "#FFFFFF",
                fontFamily: "sans-serif",
              }}
            >
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
