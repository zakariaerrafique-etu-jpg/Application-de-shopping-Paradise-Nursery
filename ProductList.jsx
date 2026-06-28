import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import "./ProductList.css";

const ProductList = ({ plants }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  // ✅ vérifier si produit déjà dans panier
  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  // ➕ ajouter produit
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // 📦 regroupement par catégorie
  const groupedPlants = plants.reduce((acc, plant) => {
    if (!acc[plant.category]) {
      acc[plant.category] = [];
    }
    acc[plant.category].push(plant);
    return acc;
  }, {});

  return (
    <div className="product-list">
      <h2>Our Plant Collection</h2>

      {Object.keys(groupedPlants).map((category) => (
        <div key={category} className="category-section">

          {/* 🏷️ titre catégorie */}
          <h3>{category}</h3>

          {/* ⚠️ vérification 6 plantes minimum */}
          {groupedPlants[category].length < 6 && (
            <p className="warning">
              ⚠ This category has less than 6 plants (required: 6+)
            </p>
          )}

          <div className="plants-grid">
            {groupedPlants[category].map((plant) => (
              <div key={plant.id} className="plant-card">

                {/* 🌿 image */}
                <img src={plant.image} alt={plant.name} />

                {/* 🌱 infos */}
                <h4>{plant.name}</h4>
                <p>${plant.price}</p>

                {/* 🛒 bouton add to cart */}
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={isInCart(plant.id)} // ✅ désactivation après ajout
                  className={isInCart(plant.id) ? "disabled" : "add-btn"}
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
