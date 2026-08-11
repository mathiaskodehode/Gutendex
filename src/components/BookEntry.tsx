import { useFavorites } from "../context/FavoritesContext.tsx";
import { Link } from "react-router";
import type Book from "../types/book.ts";

export default function BookEntry(book: Book) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    return (
        <>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
            {isFavorite(book.id) ? (
                <button onClick={() => removeFavorite(book.id)}>Remove</button>
            ) : (
                <button onClick={() => addFavorite(book)}>Favorite</button>
            )}
        </>
    );
}
