import { useEffect } from "react";
import { useParams } from "react-router";
import { useBooks } from "../context/BooksContext.tsx";
import FavoriteButton from "../components/FavoriteButton.tsx";

export default function BookDetailsPage() {
    const { bookid: bookId } = useParams();
    const bookIdNum = Number(bookId);
    const { data, loading, error, fetchBookById } = useBooks();
    const book = data?.results.find(book => book.id === bookIdNum);

    useEffect(() => {
        if (!Number.isNaN(bookIdNum) && !book) {
            fetchBookById(bookIdNum);
        }
    }, [bookIdNum]);

    if (!bookId || Number.isNaN(bookIdNum)) {
        return <p>Invalid book ID.</p>;
    }
    if (loading) {
        return <p>Loading book...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!book) {
        return <p>Book not found.</p>;
    }

    return (
        <div>
            <h2>{book.title}</h2>
            <FavoriteButton {...book} />
            <h3>Authors</h3>
            {book.authors.length > 0 ? book.authors.map(author => <p key={author.name}>{author.name}</p>) : <p>Unknown</p>}
        </div>
    );
}
