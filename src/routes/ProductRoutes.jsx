// src/routes/CustomerRoutes.js
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "../pages/ProductList";
import ProductCart from "../pages/ProductCart";
import UserCheckout from "../pages/UserCheckout";
import PaymentDetailsForm from "../components/UserPaymentForm";
import OrderReviewPage from "../components/OrderReview";

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
      <Route
        path="/productCart"
        element={<ProductCart cart={cart} setCart={setCart} />}
      />
      <Route path="/checkout" element={<UserCheckout cart={cart} />} />
      {/* Payment Page */}
      <Route path="/payment" element={<PaymentDetailsForm />} />
      {/* Order Review Page */}
      <Route path="/review" element={<OrderReviewPage cart={cart} />} />
    </Routes>
  );
};

export default ProductRoutes;
