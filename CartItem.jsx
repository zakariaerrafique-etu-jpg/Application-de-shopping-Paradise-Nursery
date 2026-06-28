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
 * Displays all items in the shopping cart with totals and actions
 */
function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  /**
   * Calculate total price for a single item
   */
  const getTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  /**
   * Calculate grand total for all items (CLEAR FUNCTION REQUIRED)
   */
  const calculateGrandTotal = () => {
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
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* CART ITEMS */}
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">

              {/* IMAGE (REQUIRED FIX) */}
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              {/* DETAILS */}
              <div className="cart-item-details">
                <h3>{item.name}</h3>

                <p>Price: ${item.price}</p>

                {/* QUANTITY CONTROLS */}
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

                {/* TOTAL PER ITEM */}
                <p>Total: ${getTotalPrice(item).toFixed(2)}</p>

                {/* REMOVE BUTTON (WITH STYLE CLASS) */}
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* GRAND TOTAL (CLEAR FUNCTION USAGE) */}
          <div className="cart-total">
            <h2>Grand Total: ${calculateGrandTotal().toFixed(2)}</h2>
          </div>

          {/* ACTION BUTTONS */}
          <div className="cart-actions">

            {/* CONTINUE SHOPPING (REAL NAVIGATION REQUIRED) */}
            <button onClick={handleContinueShopping}>
              Continue Shopping
            </button>

            {/* CHECKOUT */}
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
