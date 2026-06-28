import { useState } from "react";
import ProductList from "./components/ProductList";

/**
 * Main application component
 * Handles navigation between landing page and product list
 */
function App() {
  // State to control when product list is displayed
  const [showProducts, setShowProducts] = useState(false);

  /**
   * Handles "Get Started" button click
   * Shows the product list page
   */
  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <div className="app-container">

      {/* Landing page */}
      {!showProducts && (
        <div className="landing-page">
          <h1>Welcome to Paradise Nursery</h1>

          <p>
            Discover beautiful indoor plants and bring nature into your home.
          </p>

          <button onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      )}

      {/* Product list page */}
      {showProducts && <ProductList />}

    </div>
  );
}

export default App;
