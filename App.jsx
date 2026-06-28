import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import ProductList from "./components/ProductList";

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="app">
      <Navigation />

      {!showProducts ? (
        <div className="landing">
          <h1>Welcome to Paradise Nursery</h1>
          <p>Your one-stop shop for beautiful indoor plants</p>

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
