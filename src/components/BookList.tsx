import { useBooks } from "../context/BooksContext.tsx";
import BookEntry from "./BookEntry.tsx";
import LoadingSpinner from "./LoadingSpinner.tsx";
import Pagination from "./Pagination.tsx";

export default function BookList() {
    const { data, loading, error } = useBooks();

    if (loading) return <LoadingSpinner text="Loading books..." />;
    if (error) return <p className="status-message error-message">Error: {error}</p>;
    if (!data) return <p className="status-message">Select a category</p>;

    return (
        <>
            <Pagination />
            <ul className="book-list">
                {data.results.map(book => (
                    <li
                        key={book.id}
                        className="book-list-item"
                    >
                        <BookEntry {...book} />
                    </li>
                ))}
            </ul>
            <Pagination />
        </>
    );
}
