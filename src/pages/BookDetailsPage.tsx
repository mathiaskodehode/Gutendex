import { useEffect } from "react";
import { useParams } from "react-router";
import { useBooks } from "../context/BooksContext.tsx";

export default function BookDetailsPage() {
    const { bookid } = useParams();
    const bookidNum = Number(bookid);
    const { data, loading, error, fetchBookById } = useBooks();
    const bookDetails = data?.results.find(book => book.id === bookidNum);

    useEffect(() => {
        if (!Number.isNaN(bookidNum) && !bookDetails) {
            fetchBookById(bookidNum);
        }
    }, [bookidNum]);

    if (!bookid || Number.isNaN(bookidNum)) {
        return <p>Invalid book ID.</p>;
    }
    if (loading) {
        return <p>Loading book...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!bookDetails) {
        return <p>Book not found.</p>;
    }

    return (
        <div>
            <h2>{bookDetails.title}</h2>
            <h3>Authors</h3>
            {bookDetails.authors.length > 0 ? (
                bookDetails.authors.map(author => <p key={author.name}>{author.name}</p>)
            ) : (
                <p>Unknown</p>
            )}
        </div>
    );
}
