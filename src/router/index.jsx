import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import { Layout } from "../layout/layout.jsx";
import { BookForm } from "../pages/BookForm.jsx";
import { Search } from "../pages/Search.jsx";
import { BookDetail } from "../pages/BookDetail.jsx";
import { Register } from "../pages/Register.jsx";
import { Login } from "../pages/Login.jsx";

import React from "react";
import { RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext.jsx";

export default function index() {
  let { authReady } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/create",
          element: <BookForm />,
        },
        {
          path: "/edit/:id",
          element: <BookForm />,
        },
        {
          path: "/books/:id",
          element: <BookDetail />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return authReady && <RouterProvider router={router} />;
}
