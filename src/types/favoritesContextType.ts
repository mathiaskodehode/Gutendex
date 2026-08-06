import type Book from "./book.ts";

export default interface FavoritesContextType {
    favorites: Book[];
    addFavorite: (book: Book) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}
