import React, { useState } from "react";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";

function App() {
  // State pour contrôler l'affichage des produits
  const [showProducts, setShowProducts] = useState(false);

  // Fonction déclenchée par le bouton Get Started
  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <div>
      {/* Titre principal de l'application (exigence du projet) */}
      <h1>Welcome to Paradise Nursery</h1>

      {/* Affichage conditionnel : About + bouton OU produits */}
      {!showProducts ? (
        <div>
          <AboutUs />

          {/* Bouton pour afficher la liste des produits */}
          <button onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
