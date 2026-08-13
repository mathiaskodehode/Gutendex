import { useBooks } from "../context/BooksContext.tsx";
import BookEntry from "./BookEntry.tsx";
import Pagination from "./Pagination.tsx";

export default function BookList() {
    const { data, loading, error, currentCategory } = useBooks();

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
                {data.results.map(book => (
                    <li key={book.id}>
                        <BookEntry {...book} />
                    </li>
                ))}
            </ul>
            <Pagination />
        </>
    );
}
