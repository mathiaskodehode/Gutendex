import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useBooks } from "../context/BooksContext.tsx";
import FavoriteButton from "../components/FavoriteButton.tsx";
import type Book from "../types/book.ts";
import LoadingSpinner from "../components/LoadingSpinner.tsx";

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

    if (loading) return <LoadingSpinner text="Loading books..." />;
    if (error) return <p>Error: {error}</p>;
    if (!book) return <p>Book not found.</p>;
    const coverImage = book.formats["image/jpeg"];
    const digitalBookUrl = book.formats["text/html"] ?? book.formats["text/plain"];

    return (
        <article className="book-details">
            <div className="book-details-cover">
                {coverImage && (
                    <img
                        src={coverImage}
                        alt={`Cover of ${book.title}`}
                    />
                )}
            </div>

            <div className="book-details-content">
                <div className="book-details-header">
                    <div>
                        <h1>{book.title}</h1>

                        <p className="book-details-authors">
                            {book.authors.length > 0 ? book.authors.map(author => author.name).join(", ") : "Unknown author"}
                        </p>
                    </div>

                    <FavoriteButton {...book} />
                </div>

                <section className="book-section">
                    <h2>Summary</h2>

                    {book.summaries.length > 0 ? (
                        book.summaries.map((summary, index) => <p key={index}>{summary}</p>)
                    ) : (
                        <p>None</p>
                    )}
                </section>

                <section className="book-meta">
                    <div>
                        <h2>Download count</h2>
                        <p>{book.download_count}</p>
                    </div>

                    <div>
                        <h2>Languages</h2>
                        <p>{book.languages.length > 0 ? book.languages.join(", ") : "Unknown"}</p>
                    </div>

                    <div>
                        <h2>Subjects</h2>
                        <p>{book.subjects.length > 0 ? book.subjects.join(", ") : "Unknown"}</p>
                    </div>

                    <div>
                        <h2>Bookshelves</h2>
                        <p>{book.bookshelves.length > 0 ? book.bookshelves.join(", ") : "None"}</p>
                    </div>
                </section>

                {digitalBookUrl && (
                    <a
                        className="read-book-button"
                        href={digitalBookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read book
                    </a>
                )}
            </div>
        </article>
    );
}
