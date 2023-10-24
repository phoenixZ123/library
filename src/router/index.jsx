import { createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home.jsx"
import { Layout } from "../layout/layout.jsx";
import { Create } from "../pages/Create.jsx";
import { Search } from "../pages/Search.jsx";
import { BookDetail } from "../pages/BookDetail.jsx";


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
        element: <Create />,
      },
      {
        path: "/books/:id",
        element: <BookDetail />,
      },
    ],
  },
]);

export default router;