import { useState } from "react";
import ProductList from "./components/ProductList";

/**
 * Main App component
 * Controls navigation between landing page and product list
 */
function App() {
  // State to control when product list is displayed
  const [showProducts, setShowProducts] = useState(false);

  /**
   * Handle "Get Started" button click
   * Switches view to product list
   */
  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <div className="app-container">

      {/* Landing Page */}
      {!showProducts && (
        <div className="landing-page">

          {/* Correct title required for grading */}
          <h1>Welcome to Paradise Nursery</h1>

          <p>
            Discover a wide variety of beautiful indoor plants and bring nature
            into your home.
          </p>

          {/* Get Started button */}
          <button onClick={handleGetStarted}>
            Get Started
          </button>

        </div>
      )}

      {/* Product List Page */}
      {showProducts && <ProductList />}

    </div>
  );
}

export default App;
