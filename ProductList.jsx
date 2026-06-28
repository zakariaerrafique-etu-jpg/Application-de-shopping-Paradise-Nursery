import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function PlantCard({ plant }) {
  const dispatch = useDispatch();

  // track si ajouté au panier
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(plant));
    setAdded(true);
  };

  return (
    <div className="plant-card">

      <h3>{plant.name}</h3>
      <p>{plant.category}</p>
      <p>${plant.price}</p>

      <button
        onClick={handleAddToCart}
        disabled={added}
        className={added ? "added-btn" : "add-btn"}
      >
        {added ? "Added" : "Add to Cart"}
      </button>

    </div>
  );
}

export default PlantCard;
