import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

function Header({ cartItems = [] }) {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="150px" src="/images/logo.png" alt="Logo" />
          </Link>
        </div>
      </div>

      <Search />

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" id="cart" className="ml-3">
          <i className="fas fa-shopping-cart"></i> Cart
          <span className="ml-3" id="cart_count" style={{ marginLeft: "10px" }}>
            {cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
