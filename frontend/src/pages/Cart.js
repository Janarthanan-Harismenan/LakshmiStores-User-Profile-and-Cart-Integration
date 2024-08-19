import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Cart({ cartItems, setCartItems }) {
  const [complete, setComplete] = useState(false);

  const handleAddition = (id) => {
    const newCartItems = cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity:
              item.quantity + 1 < item.stock
                ? item.quantity + 1
                : (toast.error(`Max available quantity: ${item.stock}`),
                  item.quantity),
          }
        : item
    );
    setCartItems(newCartItems);
  };

  const handleSubtraction = (id) => {
    const newCartItems = cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity:
              item.quantity - 1 <= 1
                ? (toast.error(`Min available quantity 1`), 1)
                : item.quantity - 1,
          }
        : item
    );
    setCartItems(newCartItems);
  };

  const handleDeleteItem = (id) => {
    const newCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(newCartItems);
  };

  const handlePlaceOrder = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setComplete(true);
        setCartItems([]);
        toast.success("Order placed successfully");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        toast.error("Failed to place order");
      });
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    return total.toFixed(2); // Ensure two decimal places
  };

  return cartItems.length !== 0 ? (
    <Fragment>
      <div
        className="container container-fluid"
        style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}
      >
        <div className="row d-flex justify-content-between">
          <h2 className="mt-5">
            Your Cart:{" "}
            <b>
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </b>
          </h2>
        </div>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((item) => (
              <Fragment key={item._id}>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.images[0].image}
                        alt={item.name}
                        style={{
                          height: "90px",
                          width: "115px",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link
                        to={`product/${item._id}`}
                        style={{ textDecoration: "none", color: "#0056b3" }}
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price" style={{ color: "#343a40" }}>
                        {item.price.toFixed(2)} LKR
                      </p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-outline-danger minus"
                          onClick={() => handleSubtraction(item._id)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.quantity}
                          readOnly
                          style={{ maxWidth: "60px", textAlign: "center" }}
                        />
                        <span
                          className="btn btn-outline-success plus"
                          onClick={() => handleAddition(item._id)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div
                      className="col-4 col-lg-1 mt-4 mt-lg-0"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-outline-danger"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary" className="bg-white p-3 rounded shadow">
              <h4 className="text-dark">Order Summary</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span className="font-weight-bold">Subtotal:</span>
                <span>
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0) === 1
                    ? "item"
                    : "items"}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="font-weight-bold">Est. total:</span>
                <span>{calculateTotal()} LKR</span>
              </div>
              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={handlePlaceOrder}
                style={{ backgroundColor: "#0056b3", borderColor: "#0056b3" }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : !complete ? (
    <h1 className="text-center mt-5 text-danger">Your Cart is Empty</h1>
  ) : (
    <Fragment>
      <h1 className="text-center mt-5 text-success">
        Order Placed Successfully
      </h1>
      <p className="text-center mt-3 font-weight-bold fs-4">
        Thank you for shopping with us!
      </p>
    </Fragment>
  );
}

export default Cart;
