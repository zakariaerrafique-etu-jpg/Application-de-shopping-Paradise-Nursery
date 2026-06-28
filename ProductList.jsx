import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const products = [
  {
    id: 1,
    name: "Aloe Vera",
    category: "Medicinal Plants",
    price: 10,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Lavender",
    category: "Aromatic Plants",
    price: 12,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Mint",
    category: "Aromatic Plants",
    price: 8,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Basil",
    category: "Medicinal Plants",
    price: 9,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 5,
    name: "Rosemary",
    category: "Aromatic Plants",
    price: 11,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 6,
    name: "Snake Plant",
    category: "Air Purifying Plants",
    price: 15,
    image: "https://via.placeholder.com/150"
  }
];

function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  // Ajouter au panier
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Regrouper les produits par catégorie
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="product-list">
      <h1>🌿 Paradise Nursery - Our Plants</h1>

      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="category-section">

          {/* Category Title */}
          <h2>{category}</h2>

          <div className="products-grid">

            {groupedProducts[category].map((product) => (
              <div key={product.id} className="product-card">

                {/* Image */}
                <img src={product.image} alt={product.name} />

                {/* Name */}
                <h3>{product.name}</h3>

                {/* Price */}
                <p>{product.price} $</p>

                {/* Add to cart button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={cartItems.some((item) => item.id === product.id)}
                >
                  {cartItems.some((item) => item.id === product.id)
                    ? "Added"
                    : "Add to Cart"}
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
