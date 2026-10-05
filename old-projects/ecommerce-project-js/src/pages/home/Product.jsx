import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";
import CheckMarkImg from "../../assets/images/icons/checkmark.png";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity,
    });
    await loadCart();
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  const selectQuantity = (e) => {
    const quantitySelected = Number(e.target.value);
    setQuantity(quantitySelected);
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          data-testid="product-rating-stars"
        />
        <div
          className="product-rating-count link-primary"
          data-testid="product-rating-value"
        >
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={selectQuantity}
          data-testid="quantity-selector"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: isVisible ? 1 : 0 }}>
        <img src={CheckMarkImg} />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={addToCart}
        data-testid="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
}
