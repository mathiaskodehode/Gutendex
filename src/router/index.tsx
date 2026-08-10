import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage.tsx";
import FavoritesPage from "../pages/FavoritesPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "category/:category", element: <CategoryPage /> },
            { path: "favorites", element: <FavoritesPage /> },
        ],
    },
    {
        path: "*",
        element: <p>404 - PAGE NOT FOUND</p>,
    },
]);
