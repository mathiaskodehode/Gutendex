import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
    const { favorites, removeFavorite } = useFavorites();

    return (
        <>
            {favorites.length === 0 ? (
                <p>No favorite books yet.</p>
            ) : (
                <ul>
                    {favorites.map(book => (
                        <>
                            <li key={book.id}>
                                {book.title}
                                <button onClick={() => removeFavorite(book.id)}>Remove</button>
                            </li>
                        </>
                    ))}
                </ul>
            )}
        </>
    );
}
