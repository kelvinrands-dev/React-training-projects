import axios from "axios";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./CheckoutPage.css";
import CheckoutIcon from "../../assets/images/cart-favicon.png";

const CheckoutPage = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckOutData = async () => {
      const res = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(res.data);
    };
    fetchCheckOutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const res = await axios.get("api/payment-summary");
      setPaymentSummary(res.data);
    };
    fetchPaymentSummary();
  }, [cart]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={CheckoutIcon} />
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
};

export { CheckoutPage };
