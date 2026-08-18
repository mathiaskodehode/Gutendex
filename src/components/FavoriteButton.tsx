import { useFavorites } from "../context/FavoritesContext.tsx";
import type Book from "../types/book.ts";

export default function FavoriteButton(book: Book) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(book.id);

    return (
        <button
            className={`favorite-button ${favorite ? "is-favorite" : ""}`}
            onClick={() => (favorite ? removeFavorite(book.id) : addFavorite(book))}
        >
            {favorite ? "Remove favorite" : "Favorite"}
        </button>
    );
}
