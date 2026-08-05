import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/index.tsx";
import { BooksProvider } from "./context/BooksContext";

const root = document.getElementById("root")!;

createRoot(root).render(
    <StrictMode>
        <BooksProvider>
            <RouterProvider router={router} />
        </BooksProvider>
    </StrictMode>,
);
