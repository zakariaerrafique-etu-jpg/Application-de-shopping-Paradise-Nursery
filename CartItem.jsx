import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../features/cart/CartSlice";

const CartItem = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(state => state.cart);

  return (
    <div>
      <h2>Cart</h2>

      {items.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Qty: {item.quantity}</p>
          <p>Total: ${item.price * item.quantity}</p>

          <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
          <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>

          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total Price: ${totalPrice}</h3>

      <button onClick={() => alert("Coming Soon")}>
        Checkout
      </button>

      <button onClick={() => window.location.href = "/plants"}>
        Continue Shopping
      </button>
    </div>
  );
};

export default CartItem;
