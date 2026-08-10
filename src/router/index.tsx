import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "category/:category", element: <CategoryPage /> },
            { path: "favorites", element: <h1>FAVORITES PAGE</h1> },
        ],
    },
    {
        path: "*",
        element: <p>404 - PAGE NOT FOUND</p>,
    },
]);
