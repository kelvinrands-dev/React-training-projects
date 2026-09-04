import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { NoPage } from "./pages/NoPage";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/cart-items?expand=product");
      setCart(res.data);
    };

    getData();

    /*axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });*/
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
