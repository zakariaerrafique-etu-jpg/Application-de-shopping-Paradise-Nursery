import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./AboutUs";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/plants">Plants</Link> |{" "}
        <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="home">
              <h1>Paradise Nursery</h1>
              <button>Get Started</button>
            </div>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </Router>
  );
};

export default App;
