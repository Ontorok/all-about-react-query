import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TraditionalFetch from "./pages/TraditionalFetchPage";
import HomePage from "./pages/HomePage";
import RQProductsPage from "./pages/RQProductsPage";
import RQProductPage from "./pages/RQProductPage";
import RQPaginatedProducts from "./pages/RQPaginatedProducts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/traditional-fetch", element: <TraditionalFetch /> },
      { path: "/react-query", element: <RQProductsPage /> },
      { path: "/react-paginated-query", element: <RQPaginatedProducts /> },
      { path: "/react-query/:id", element: <RQProductPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
