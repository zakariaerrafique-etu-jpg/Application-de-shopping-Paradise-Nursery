import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/cartSlice";
import "./ProductList.css";

const ProductList = ({ plants }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Vérifie si un produit est déjà dans le panier
  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  // Ajout panier
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // Regroupement par catégorie
  const groupedPlants = plants.reduce((acc, plant) => {
    if (!acc[plant.category]) {
      acc[plant.category] = [];
    }
    acc[plant.category].push(plant);
    return acc;
  }, {});

  return (
    <div className="product-list">
      <h2 className="title">Our Plants Collection</h2>

      {Object.keys(groupedPlants).map((category) => (
        <div key={category} className="category-section">
          <h3 className="category-title">{category}</h3>

          {/* Vérification pédagogique du nombre de plantes */}
          {groupedPlants[category].length < 6 && (
            <p className="warning">
              ⚠ This category has less than 6 plants
            </p>
          )}

          <div className="plants-grid">
            {groupedPlants[category].map((plant) => (
              <div key={plant.id} className="plant-card">
                <img src={plant.image} alt={plant.name} />
                <h4>{plant.name}</h4>
                <p>${plant.price}</p>

                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={isInCart(plant.id)}
                  className={isInCart(plant.id) ? "disabled-btn" : "add-btn"}
                >
                  {isInCart(plant.id) ? "Added ✓" : "Add to Cart"}
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
