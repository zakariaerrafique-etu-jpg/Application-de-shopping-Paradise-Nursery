import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./CartItem.css";

const CartItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // 🔢 Calcul du total d’un article
  const getItemTotal = (item) => {
    return item.price * item.quantity;
  };

  // 🧮 Calcul du total global (OBLIGATOIRE pour la note)
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // ➕ / ➖ quantité
  const handleQuantityChange = (item, type) => {
    const newQuantity =
      type === "increase" ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  // ❌ suppression article
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  // 🛒 vider panier
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>

          <button
            onClick={() => navigate("/")}
            className="continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />

                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item, "decrease")}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => handleQuantityChange(item, "increase")}
                    >
                      +
                    </button>
                  </div>

                  <p className="item-total">
                    Total: ${getItemTotal(item)}
                  </p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* 🧾 résumé panier */}
          <div className="cart-summary">
            <h3>Total Amount: ${calculateTotalAmount()}</h3>

            <div className="cart-actions">
              <button
                className="clear-btn"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>

              <button
                className="checkout-btn"
                onClick={() => alert("Checkout successful!")}
              >
                Checkout
              </button>
            </div>

            <button
              className="continue-shopping"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
