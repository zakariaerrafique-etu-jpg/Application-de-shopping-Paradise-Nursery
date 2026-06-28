import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const plants = [
    {
      id: 1,
      name: "Aloe Vera",
      category: "Succulents",
      price: 10,
      image: "/images/aloe.jpg"
    },
    {
      id: 2,
      name: "Cactus",
      category: "Succulents",
      price: 8,
      image: "/images/cactus.jpg"
    },
    {
      id: 3,
      name: "Snake Plant",
      category: "Air Purifying",
      price: 15,
      image: "/images/snake.jpg"
    },
    {
      id: 4,
      name: "Peace Lily",
      category: "Air Purifying",
      price: 12,
      image: "/images/peace.jpg"
    },
    {
      id: 5,
      name: "Fern",
      category: "Indoor Plants",
      price: 9,
      image: "/images/fern.jpg"
    },
    {
      id: 6,
      name: "Monstera",
      category: "Indoor Plants",
      price: 20,
      image: "/images/monstera.jpg"
    }
  ];

  const isInCart = (id) => {
    return cart.some(item => item.id === id);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <h2>Products</h2>

      <div>
        🛒 Total Items in Cart: {totalItems}
      </div>

      {plants.map((plant) => (
        <div key={plant.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          
          <img 
            src={plant.image} 
            alt={plant.name} 
            width="100"
          />

          <h3>{plant.name}</h3>
          <p>{plant.category}</p>
          <p>${plant.price}</p>

          <button
            onClick={() => handleAdd(plant)}
            disabled={isInCart(plant.id)}
          >
            {isInCart(plant.id) ? "Added" : "Add to Cart"}
          </button>

        </div>
      ))}
    </div>
  );
};

export default ProductList;
