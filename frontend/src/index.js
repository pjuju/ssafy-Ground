import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import LoginPage from "./pages/LoginPage";
// import ComponentTest from "pages/ComponentTest";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginPage/>
  </React.StrictMode>
);
