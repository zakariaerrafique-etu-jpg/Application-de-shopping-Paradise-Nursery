import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

/**
 * ProductList component
 * Displays plants grouped by category
 */
function ProductList({ plants }) {
  const dispatch = useDispatch();

  // Track added items (to disable button)
  const [addedItems, setAddedItems] = useState({});

  /**
   * Handle adding plant to cart
   */
  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));

    // Mark item as added (disable button)
    setAddedItems((prev) => ({
      ...prev,
      [plant.id]: true,
    }));
  };

  /**
   * Group plants by category
   */
  const groupedPlants = plants.reduce((acc, plant) => {
    const category = plant.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(plant);
    return acc;
  }, {});

  return (
    <div className="product-list-container">

      <h1>Our Plants</h1>

      {/* Loop through categories */}
      {Object.keys(groupedPlants).map((category) => (
        <div key={category} className="category-section">

          {/* Category title */}
          <h2>{category}</h2>

          <div className="plants-grid">

            {/* Plants inside category */}
            {groupedPlants[category].map((plant) => (
              <div key={plant.id} className="plant-card">

                {/* Image */}
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="plant-image"
                />

                {/* Info */}
                <h3>{plant.name}</h3>
                <p>Price: ${plant.price}</p>

                {/* Add to Cart button */}
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedItems[plant.id]}
                  className={
                    addedItems[plant.id] ? "added-btn" : "add-btn"
                  }
                >
                  {addedItems[plant.id] ? "Added" : "Add to Cart"}
                </button>

              </div>
            ))}

          </div>
        </div>
      ))}

    </div>
  );
}

export default ProductList;
