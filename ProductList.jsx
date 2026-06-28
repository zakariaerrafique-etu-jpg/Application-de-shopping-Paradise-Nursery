import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // ✅ calcul du total général (équivalent calculateTotalAmount)
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart-container">

      <h1>🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty</p>

          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* LISTE DES ARTICLES */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">

                <img src={item.image} alt={item.name} />

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.price} $</p>
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

          {/* TOTAL DYNAMIQUE */}
          <div className="cart-summary">
            <h2>Total: {calculateTotalAmount()} $</h2>
          </div>

          {/* ACTIONS */}
          <div className="cart-actions">
            <button onClick={() => navigate("/products")}>
              Continue Shopping
            </button>

            <button className="checkout-btn">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
