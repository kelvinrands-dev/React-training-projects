import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";
import HomeIcon from "../../assets/images/home-favicon.png";

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    };

    getHomeData();

    /*axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });*/
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={HomeIcon} />
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export { HomePage };
