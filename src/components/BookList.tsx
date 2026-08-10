import { useBooks } from "../context/BooksContext.tsx";
import { useFavorites } from "../context/FavoritesContext.tsx";
import Pagination from "./Pagination.tsx";

export default function BookList() {
    const { data, loading, error, currentCategory } = useBooks();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    if (loading) {
        // TODO: add spinner
        return <p>Loading books...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!data) {
        return <p>Select a category</p>;
    }

    return (
        <>
            <h2>{currentCategory}</h2>
            <ul>
                {data?.results.map(book => (
                    <li key={book.id}>
                        {book.title}
                        {isFavorite(book.id) ? (
                            <button onClick={() => removeFavorite(book.id)}>Remove</button>
                        ) : (
                            <button onClick={() => addFavorite(book)}>Favorite</button>
                        )}
                    </li>
                ))}
            </ul>
            <Pagination />
        </>
    );
}
