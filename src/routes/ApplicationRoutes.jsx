import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "../components/Header";
import ProductRoutes from "./ProductRoutes";

const ApplicationRoutes = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/" />} />
        <Route
          path="/user/*"
          element={
            <>
              <Header /> <ProductRoutes cart={cart} addToCart={addToCart} />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default ApplicationRoutes;
