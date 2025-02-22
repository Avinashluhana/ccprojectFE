import React from "react";
import {
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
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
