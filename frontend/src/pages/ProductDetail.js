import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = ({ cartItems = [], setCartItems }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const addToCart = () => {
    if (!product) return; // Handle case where product might be null

    const productInCart = cartItems.find((item) => item._id === id);
    if (!productInCart && quantity > 0) {
      setCartItems([...cartItems, { ...product, quantity }]);
      toast.success("Product added to cart");
    } else if (productInCart && quantity > 0) {
      toast.info("Product is already in the cart");
    } else {
      toast.error("Please select a quantity");
    }
  };

  const increaseQty = () => {
    if (!product) return; // Handle case where product might be null

    if (quantity >= product.stock) {
      toast.error("Stock is not enough");
    } else {
      setQuantity((prevQty) => prevQty + 1);
    }
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
  };

  // If the product is still loading, show a loading message
  if (!product) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const { name, price, description, ratings, images, category, stock } =
    product;

  return (
    <div className="container mt-5" style={{ fontFamily: "sans-serif" }}>
      <div className="row">
        <div className="col-md-6">
          <div
            id="productCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {images.map((img, index) => (
                <div
                  key={img._id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img src={img.image} className="d-block w-100" alt={name} />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <h1>{name}</h1>
          <h4 className="text-muted">{category}</h4>
          <p>{description}</p>
          <h3>{price.toFixed(2)} LKR</h3>
          <div className="ratings mt-3">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{
                  width: `${(ratings / 5) * 100}%`,
                  backgroundColor: "#87CEFA",
                }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numberOfReviews} Reviews)</span>
          </div>

          <div className="d-flex align-items-center mt-3">
            <div className="input-group me-3" style={{ width: "auto" }}>
              <button
                className="btn btn-outline-danger"
                onClick={decreaseQty}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={quantity}
                readOnly
                style={{ maxWidth: "60px" }}
              />
              <button className="btn btn-outline-success" onClick={increaseQty}>
                +
              </button>
            </div>
            <button
              className="btn btn-primary"
              disabled={product.stock === 0}
              onClick={addToCart}
            >
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>

          <div className="mt-3">
            <button
              className={`btn ${stock > 0 ? "btn-success" : "btn-danger"}`}
              disabled={stock === 0}
            >
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
