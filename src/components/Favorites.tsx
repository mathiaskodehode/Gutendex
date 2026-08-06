import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
    const { favorites, removeFavorite } = useFavorites();

    return (
        <>
            <h2>Favorites</h2>

            {favorites.length === 0 ? (
                <p>No favorite books yet.</p>
            ) : (
                <ul>
                    {favorites.map(book => (
                        <>
                            <li key={book.id}>{book.title}</li>
                            <button onClick={() => removeFavorite(book.id)}>Remove</button>
                        </>
                    ))}
                </ul>
            )}
        </>
    );
}
