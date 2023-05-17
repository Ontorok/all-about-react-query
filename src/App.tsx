import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TraditionalFetch from "./pages/TraditionalFetchPage";
import ReactQuery from "./pages/ReactQueryPage";
import HomePage from "./pages/HomePage";
import RQSuperHero from "./pages/RQSuperHero";
import RQProductPage from "./pages/RQProductPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/traditional-fetch", element: <TraditionalFetch /> },
      { path: "/react-query", element: <ReactQuery /> },
      { path: "/react-query/:id", element: <RQProductPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
