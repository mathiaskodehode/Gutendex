import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useBooks } from "../context/BooksContext.tsx";
import FavoriteButton from "../components/FavoriteButton.tsx";
import type Book from "../types/book.ts";

export default function BookDetailsPage() {
    const { bookid } = useParams();
    const { getBookById } = useBooks();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!bookid) {
            setError("No book ID was provided.");
            setLoading(false);
            return;
        }
        const id = Number(bookid);
        if (!Number.isInteger(id)) {
            setError("Invalid book ID.");
            setLoading(false);
            return;
        }
        setBook(null);
        setLoading(true);
        setError(null);

        // active prevents stale requests from updating the page after the effect is no longer active.
        let active = true;
        getBookById(id)
            .then(book => {
                if (!active) return;
                if (book) setBook(book);
                else setError("Book not found.");
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [bookid]);

    if (loading) return <p>Loading book...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!book) return <p>Book not found.</p>;
    const coverImage = book.formats["image/jpeg"];
    const digitalBookUrl = book.formats["text/html"] ?? book.formats["text/plain"];

    return (
        <div>
            <h2>{book.title}</h2>
            <FavoriteButton {...book} />
            {coverImage && (
                <img
                    src={coverImage}
                    alt={`Cover of ${book.title}`}
                />
            )}
            <h3>Authors</h3>
            {book.authors.length > 0 ? book.authors.map(author => <p key={author.name}>{author.name}</p>) : <p>Unknown</p>}
            <h3>Download count</h3>
            <p>{book.download_count}</p>
            <h3>Category</h3>
            {book.subjects.length > 0 ? book.subjects.map(subject => <p key={subject}>{subject}</p>) : <p>Unknown</p>}
            <h3>Languages</h3>
            <p>{book.languages.length > 0 ? book.languages.join(", ") : "Unknown"}</p>
            {digitalBookUrl && (
                <>
                    <h3>Digital book</h3>
                    <a
                        href={digitalBookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read book
                    </a>
                </>
            )}
            <h3>Bookshelves</h3>
            {book.bookshelves.length > 0 ? book.bookshelves.map(bookshelf => <p key={bookshelf}>{bookshelf}</p>) : <p>None</p>}
            <h3>Editors</h3>
            {book.editors.length > 0 ? book.editors.map(editor => <p key={editor.name}>{editor.name}</p>) : <p>None</p>}
            <h3>Summaries</h3>
            {book.summaries.length > 0 ? book.summaries.map((summary, index) => <p key={index}>{summary}</p>) : <p>None</p>}
            <h3>Translators</h3>
            {book.translators.length > 0 ? (
                book.translators.map(translator => <p key={translator.name}>{translator.name}</p>)
            ) : (
                <p>None</p>
            )}
        </div>
    );
}
