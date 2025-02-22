// src/routes/CustomerRoutes.js
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "../pages/ProductList";

const ProductRoutes = () => {
  const [cart, setCart] = useState([]); // Cart state management
  const [cartCount, setCartCount] = useState(0); // Cart item count

  return (
    <Routes>
      {/* Product Page */}
      <Route
        path="/"
        element={
          <ProductList
            cart={cart}
            setCart={setCart}
            cartCount={cartCount}
            setCartCount={setCartCount}
          />
        }
      />
    </Routes>
  );
};

export default ProductRoutes;
