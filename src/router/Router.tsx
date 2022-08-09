import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

// import GlobalNav from "../components/pages/GlobalNav";
import TopPage from "../components/pages/TopPage";
// import Register from "../components/pages/Register";
import LoginPage from "../components/pages/LoginPage";
import AlertPage from "../components/pages/AlertPage";
import MainPageTemplate from "../components/templates/MainPageTemplate";

import axios from "axios";

// //ここは自分の環境に合わせる必要がある
// axios.defaults.baseURL =
//   "https://460ed379e1b841238a68fdc0980af1ab.vfs.cloud9.ap-northeast-1.amazonaws.com/";

// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Accept"] = "application/json";
// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(function (config) {
//   const token = window.localStorage.getItem("auth_token");
//   if (config.headers)
//     config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
// });

const Router = () => {
  //認証済みかチェックする
  //   let AuthFlg = false;
  //   if (window.localStorage.getItem("auth_token")) {
  //     AuthFlg = true;
  //   }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageTemplate Page={<TopPage />} />} />
        <Route
          path="/alert"
          element={<MainPageTemplate Page={<AlertPage />} />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {/* <Switch>
        <Route exact path="/">
          <Header />
          <Top authflg={AuthFlg} />
          <Footer />
        </Route>
        <Route path="/alert">
          <Header />
          <Alert authflg={AuthFlg} />
          <Footer />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
      <GlobalNav /> */}
    </BrowserRouter>
  );
};

export default Router;
