import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";
import HomeIcon from "../../assets/images/home-favicon.png";

function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={HomeIcon} />
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}

export { HomePage };
