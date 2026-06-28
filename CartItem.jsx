import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Total par item + total global
  const getTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ➕ augmenter quantité
  const handleIncrease = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    );
  };

  // ➖ diminuer quantité
  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1
        })
      );
    }
  };

  // ❌ supprimer
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  // 💳 checkout
  const handleCheckout = () => {
    alert("Payment successful! Thank you for your purchase.");
    // option UX : vider panier ou rediriger
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
          >
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${getTotalPrice(item)}</p>

            <button onClick={() => handleIncrease(item)}>+</button>
            <button onClick={() => handleDecrease(item)}>-</button>

            <button onClick={() => handleRemove(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}

      {/* ✅ TOTAL GLOBAL */}
      <h2>Cart Total: ${cartTotal}</h2>

      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Checkout
      </button>
    </div>
  );
};

export default CartItem;
