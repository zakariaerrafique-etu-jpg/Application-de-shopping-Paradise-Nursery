import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
  clearCart,
} from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import "./CartItem.css";

const CartItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // 🧮 total par article
  const getItemTotal = (item) => {
    return item.price * item.quantity;
  };

  // 🧮 total global (obligatoire)
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // ➕ ➖ quantité
  const handleQuantityChange = (item, type) => {
    let newQty =
      type === "increase"
        ? item.quantity + 1
        : item.quantity - 1;

    // ❗ suppression automatique si quantité = 0
    if (newQty <= 0) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: newQty,
        })
      );
    }
  };

  // ❌ suppression manuelle
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  // 🧹 vider panier
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
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">

            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">

                {/* image */}
                <img src={item.image} alt={item.name} />

                {/* infos */}
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>

                  {/* quantity controls */}
                  <div className="qty-controls">

                    <button
                      className="qty-btn"
                      onClick={() =>
                        handleQuantityChange(item, "decrease")
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        handleQuantityChange(item, "increase")
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* total item */}
                  <p className="item-total">
                    Total: ${getItemTotal(item)}
                  </p>
                </div>

                {/* ❌ remove button */}
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

          </div>

          {/* 🧾 summary */}
          <div className="cart-summary">

            <h3>Total: ${calculateTotalAmount()}</h3>

            <button
              className="clear-btn"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>

            <button
              className="checkout-btn"
              onClick={() => alert("Order placed!")}
            >
              Checkout
            </button>

            <button
              className="continue-btn"
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
