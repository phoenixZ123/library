import ReactDOM from "react-dom/client";
import router from "./router";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeContextProvider } from "./Contexts/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <RouterProvider router={router} />
  </ThemeContextProvider>
);
