import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

// import GlobalNav from "../components/pages/GlobalNav";
import TopPage from "../components/pages/TopPage";
// import Register from "../components/pages/Register";
import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/auth/RegisterPage";
import AlertPage from "../components/pages/AlertPage";
import MainPageTemplate from "../components/templates/MainPageTemplate";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageTemplate Page={<TopPage />} />} />
        <Route
          path="/alert"
          element={<MainPageTemplate Page={<AlertPage />} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
