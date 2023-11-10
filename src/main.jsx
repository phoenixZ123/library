import ReactDOM from "react-dom/client";
import router from "./router";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeContextProvider } from "./Contexts/ThemeContext";
import { AuthContextProvider } from "./Contexts/AuthContext";
import Router from "./router/index.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <Router />
    </ThemeContextProvider>
  </AuthContextProvider>
);
