import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProductRoutes from "./ProductRoutes";
import Header from "../components/Header";

const ApplicationRoutes = () => {

  return (
    <Router>
      <Header />
      <Routes></Routes>
    </Router>
  );
};

export default ApplicationRoutes;
