import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/CartSlice";

const products = [
  { id: 1, name: "Aloe Vera", price: 10, category: "Succulents" },
  { id: 2, name: "Cactus", price: 12, category: "Succulents" },
  { id: 3, name: "Basil", price: 8, category: "Herbs" },
  { id: 4, name: "Mint", price: 7, category: "Herbs" },
  { id: 5, name: "Fern", price: 15, category: "Indoor" },
  { id: 6, name: "Snake Plant", price: 20, category: "Indoor" },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState([]);

  const handleAdd = (product) => {
    dispatch(addToCart(product));
    setAdded([...added, product.id]);
  };

  return (
    <div>
      <h2>Plants</h2>

      {["Succulents", "Herbs", "Indoor"].map(cat => (
        <div key={cat}>
          <h3>{cat}</h3>
          <div>
            {products
              .filter(p => p.category === cat)
              .map(p => (
                <div key={p.id}>
                  <p>{p.name}</p>
                  <p>${p.price}</p>

                  <button
                    disabled={added.includes(p.id)}
                    onClick={() => handleAdd(p)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
