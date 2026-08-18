import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/index.tsx";
import { BooksProvider } from "./context/BooksContext";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";
import "./index.css";

const root = document.getElementById("root")!;

createRoot(root).render(
    <StrictMode>
        <FavoritesProvider>
            <BooksProvider>
                <RouterProvider router={router} />
            </BooksProvider>
        </FavoritesProvider>
    </StrictMode>,
);
