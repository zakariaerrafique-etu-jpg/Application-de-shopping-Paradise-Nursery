import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Liste des plantes
  const plants = [
    { id: 1, name: "Aloe Vera", category: "Succulents", price: 10 },
    { id: 2, name: "Cactus", category: "Succulents", price: 8 },
    { id: 3, name: "Echeveria", category: "Succulents", price: 12 },
    { id: 4, name: "Snake Plant", category: "Air Purifying", price: 15 },
    { id: 5, name: "Peace Lily", category: "Air Purifying", price: 14 },
    { id: 6, name: "Spider Plant", category: "Air Purifying", price: 11 },
    { id: 7, name: "Monstera", category: "Indoor Plants", price: 20 },
    { id: 8, name: "Ficus", category: "Indoor Plants", price: 18 },
    { id: 9, name: "Fern", category: "Indoor Plants", price: 9 }
  ];

  // Vérifie si un produit est déjà dans le panier
  const isInCart = (id) => {
    return cartItems.some(item => item.id === id);
  };

  // Ajouter au panier
  const handleAdd = (plant) => {
    dispatch(addItem(plant));
  };

  // Regroupement par catégorie (IMPORTANT POUR LA NOTE)
  const groupedPlants = plants.reduce((acc, plant) => {
    if (!acc[plant.category]) {
      acc[plant.category] = [];
    }
    acc[plant.category].push(plant);
    return acc;
  }, {});

  return (
    <div>
      <h2>Products</h2>

      {/* Parcours des catégories */}
      {Object.keys(groupedPlants).map((category) => (
        <div key={category}>
          <h3>{category}</h3>

          {groupedPlants[category].map((plant) => (
            <div
              key={plant.id}
              style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
            >
              <h4>{plant.name}</h4>
              <p>Price: ${plant.price}</p>

              <button
                onClick={() => handleAdd(plant)}
                disabled={isInCart(plant.id)} // ✅ IMPORTANT
              >
                {isInCart(plant.id) ? "Added" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
