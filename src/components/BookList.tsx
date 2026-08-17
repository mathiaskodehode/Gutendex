import { useBooks } from "../context/BooksContext.tsx";
import BookEntry from "./BookEntry.tsx";
import Pagination from "./Pagination.tsx";

export default function BookList() {
    const { data, loading, error } = useBooks();

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
