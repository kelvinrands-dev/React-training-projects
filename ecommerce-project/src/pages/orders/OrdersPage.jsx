import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";
import "./OrdersPage.css";

import OrdersIcon from "../../assets/images/orders-favicon.png";

const OrdersPage = ({ cart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("api/orders?expand=products");
      setOrders(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={OrdersIcon} />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} />
      </div>
    </>
  );
};

export { OrdersPage };
