import { useFavorites } from "../context/FavoritesContext";
import BookEntry from "./BookEntry.tsx";

export default function Favorites() {
    const { favorites } = useFavorites();

    return (
        <>
            {favorites.length === 0 ? (
                <p>No favorite books yet.</p>
            ) : (
                <ul>
                    {favorites.map(book => (
                        <li key={book.id}>{BookEntry(book)}</li>
                    ))}
                </ul>
            )}
        </>
    );
}
