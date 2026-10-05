import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateButton = async () => {
    if (isUpdating === false) {
      setIsUpdating(true);
      return;
    }
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(quantity),
    });
    setIsUpdating(false);
    await loadCart();
  };

  const deleteCartItem = async () => {
    await axios.delete(`api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdating && (
              <input
                className="quantity-textbox"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateButton();
                  }
                  if (e.key === "Escape") {
                    setIsUpdating(false);
                    setQuantity(cartItem.quantity);
                  }
                }}
                type="text"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            )}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateButton}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
