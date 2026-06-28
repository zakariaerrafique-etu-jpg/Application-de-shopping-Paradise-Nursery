import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <div className="app-container">

        <Routes>

          {/* Landing Page */}
          <Route
            path="/"
            element={
              <div className="landing-page">
                <h1>Welcome to Paradise Nursery</h1>
                <p>
                  Discover a wide variety of beautiful indoor plants and bring nature into your home.
                </p>

                <a href="/products">
                  <button>Get Started</button>
                </a>
              </div>
            }
          />

          {/* Products Page */}
          <Route path="/products" element={<ProductList />} />

          {/* Cart Page */}
          <Route path="/cart" element={<Cart />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
