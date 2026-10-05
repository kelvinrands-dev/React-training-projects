import axios from "axios";
import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";
import HomeIcon from "../../assets/images/home-favicon.png";

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const endPoint = search
      ? `/api/products?search=${search}`
      : "/api/products";
    const getHomeData = async () => {
      const res = await axios.get(endPoint);
      setProducts(res.data);
    };

    getHomeData();
  }, [search]);

  window.axios = axios;

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
