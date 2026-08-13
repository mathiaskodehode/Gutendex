import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage.tsx";
import FavoritesPage from "../pages/FavoritesPage.tsx";
import BookDetailsPage from "../pages/BookDetailsPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "category/:category",
                element: <CategoryPage />,
            },
            {
                path: "favorites",
                element: <FavoritesPage />,
            },
            {
                path: "book/:bookid",
                element: <BookDetailsPage />,
            },
            {
                path: "*",
                element: <p>404 - PAGE NOT FOUND</p>,
            },
        ],
    },
]);
