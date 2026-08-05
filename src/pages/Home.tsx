import { useBooks } from "../context/BooksContext";

export default function Home() {
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
        <ul>
            {data.results.map(book => (
                <li key={book.id}>{book.title}</li>
            ))}
        </ul>
    );
}
