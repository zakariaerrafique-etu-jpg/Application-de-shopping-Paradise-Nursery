import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../redux/cartSlice";

/**
 * CartItem component
 * Displays all items in the shopping cart
 */
function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  /**
   * Calculate total price for one item
   */
  const getTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  /**
   * Calculate grand total for all items
   */
  const getGrandTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + getTotalPrice(item);
    }, 0);
  };

  /**
   * Handle item removal with confirmation
   */
  const handleRemove = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item?"
    );

    if (confirmDelete) {
      dispatch(removeItem(id));
    }
  };

  /**
   * Navigate back to shopping page
   */
  const handleContinueShopping = () => {
    navigate("/");
  };

  /**
   * Handle checkout action
   */
  const handleCheckout = () => {
    alert("Thank you for your purchase!");
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Cart items list */}
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">

              {/* Product image */}
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              {/* Product info */}
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>

                {/* Quantity controls */}
                <div className="quantity-controls">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>

                {/* Total per item */}
                <p>Total: ${getTotalPrice(item).toFixed(2)}</p>

                {/* Remove button */}
                <button
                  className="delete-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Grand total */}
          <div className="cart-total">
            <h2>Grand Total: ${getGrandTotal().toFixed(2)}</h2>
          </div>

          {/* Action buttons */}
          <div className="cart-actions">
            <button onClick={handleContinueShopping}>
              Continue Shopping
            </button>

            <button onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
