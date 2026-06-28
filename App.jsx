import React, { useState } from "react";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <div>
      <h1>Paradise Nursery</h1>

      {!showProducts ? (
        <div>
          <AboutUs />

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
