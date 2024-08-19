import React, { Fragment } from "react";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams(); // Use the searchParams directly

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/products?${searchParams.toString()}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error)); // Handle fetch errors
  }, [searchParams]);

  return (
    <Fragment>
      <h1
        id="products_heading"
        className="text-dark" // Dark text color
        style={{ fontFamily: "sans-serif" }} // Custom font family
      >
        Latest Products
      </h1>

      <section
        id="products"
        className="container mt-5"
        style={{ fontFamily: "sans-serif" }}
      >
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </Fragment>
  );
}

export default Home;
