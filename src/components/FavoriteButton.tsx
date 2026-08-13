import { useFavorites } from "../context/FavoritesContext.tsx";
import type Book from "../types/book.ts";

export default function FavoriteButton(book: Book) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(book.id);

    return favorite ? (
        <button onClick={() => removeFavorite(book.id)}>Remove</button>
    ) : (
        <button onClick={() => addFavorite(book)}>Favorite</button>
    );
}
