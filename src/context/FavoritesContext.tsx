import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type Book from "../types/book.ts";
import type FavoritesContextType from "../types/favoritesContextType.ts";

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Book[]>(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    function addFavorite(book: Book) {
        setFavorites(prev => {
            if (prev.some(fav => fav.id === book.id)) {
                return prev;
            }

            return [...prev, book];
        });
    }
    function removeFavorite(id: number) {
        setFavorites(prev => prev.filter(book => book.id !== id));
    }
    function isFavorite(id: number) {
        return favorites.some(book => book.id === id);
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addFavorite,
                removeFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
