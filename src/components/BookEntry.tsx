import { useFavorites } from "../context/FavoritesContext.tsx";
import { Link } from "react-router";
import type Book from "../types/book.ts";

export default function BookEntry(book: Book) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(book.id);

    return (
        <>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
            {favorite ? (
                <button onClick={() => removeFavorite(book.id)}>Remove</button>
            ) : (
                <button onClick={() => addFavorite(book)}>Favorite</button>
            )}
        </>
    );
}
