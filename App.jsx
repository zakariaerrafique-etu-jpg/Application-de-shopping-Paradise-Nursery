import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import ProductList from "./components/ProductList";
function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="app-container">

      <h1>Welcome to Paradise Nursery</h1>

      {!showProducts ? (
        <div className="landing-section">
          <button onClick={() => setShowProducts(true)}>
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
