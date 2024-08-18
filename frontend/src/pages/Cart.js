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

  //   const handlePlaceOrder = () => {
  //     fetch(`${process.env.REACT_APP_API_URL}/orders`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ cartItems }),
  //     }).then(
  //       setCartItems([]),
  //       setComplete(true),
  //       toast.success("Order placed successfully")
  //     );
  //   };

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
      .then((data) => {
        setComplete(true);
        setCartItems([]);
        toast.success("Order placed successfully");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        toast.error("Failed to place order");
      });
  };

  return cartItems.length != 0 ? (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart:{" "}
          <b>
            {cartItems.length} {cartItems.length == 1 ? "item" : "items"}
          </b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {console.log(cartItems)}
            {cartItems.map((item) => (
              <Fragment>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.images[0].image}
                        alt={item.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={"product/" + item._id}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => handleSubtraction(item._id)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.quantity}
                        />

                        <span
                          className="btn btn-primary plus"
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
                        className="fa fa-trash btn btn-danger"
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0) == 1
                    ? "item"
                    : "items"}
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">
                  $
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={handlePlaceOrder}
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
      <p className="text-center mt-3 text-danger font-weight-bold fs-4">
        Thank you for shopping with us.
      </p>
    </Fragment>
  );
}

export default Cart;
