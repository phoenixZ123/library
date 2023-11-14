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
import { Navigate } from "react-router-dom";

export default function index() {
  let { authReady, user } = useContext(AuthContext);

  const isAuthenticated = Boolean(user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "/create",
          element: isAuthenticated ? <BookForm /> : <Navigate to="/login" />,
        },
        {
          path: "/edit/:id",
          element: isAuthenticated ? <BookForm /> : <Navigate to="/login" />,
        },
        {
          path: "/books/:id",
          element: isAuthenticated ? <BookDetail /> : <Navigate to="/login" />,
        },
        {
          path: "/register",
          element: isAuthenticated ? <Navigate to="/" /> : <Register />,
        },
        {
          path: "/login",
          element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
        },
        {
          path: "/search",
          element: isAuthenticated ? <Search /> : <Navigate to="/login" />,
        },
      ],
    },
  ]);
  return authReady && <RouterProvider router={router} />;
}
