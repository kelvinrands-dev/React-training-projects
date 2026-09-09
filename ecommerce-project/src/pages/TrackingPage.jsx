import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useParams } from "react-router";
import Header from "../components/Header";
import "./TrackingPage.css";
import TrackingIcon from "../assets/images/tracking-favicon.png";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(res.data);
    };
    getOrder();
  }, [orderId]);

  if (!order) return null;

  const orderItem = order.products.find((prod) => {
    return prod.productId === productId;
  });

  const productDetails = orderItem.product;

  const totalDeliveryTimeMs =
    orderItem.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent >= 100) {
    deliveryPercent = 100;
  }

  //PROGRESSBAR STUFF
  let isPreparing = null;
  let isShipped = null;
  let isDelivered = null;
  if (deliveryPercent < 33) {
    isPreparing = deliveryPercent;
  } else if (deliveryPercent >= 33 && deliveryPercent < 100) {
    isShipped = deliveryPercent;
  } else if (deliveryPercent === 100) {
    isDelivered = deliveryPercent;
  }

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={TrackingIcon} />
      <title>Tracking</title>

      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered On" : "Arriving On"}
            {dayjs(orderItem.estimatedDeliveryTimeMs).format(" dddd, MMMM, D")}
            th
          </div>

          <div className="product-info">{productDetails.name}</div>

          <div className="product-info">Quantity: {orderItem.quantity}</div>

          <img className="product-image" src={productDetails.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
