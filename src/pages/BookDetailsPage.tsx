import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useBooks } from "../context/BooksContext.tsx";
import type Book from "../types/book.ts";
import FavoriteButton from "../components/FavoriteButton.tsx";

export default function BookDetailsPage() {
    const { bookid } = useParams();
    const { getBookById } = useBooks();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!bookid) return;
        setBook(null);
        setLoading(true);
        setError(null);
        getBookById(Number(bookid))
            .then(book => {
                if (book) {
                    setBook(book);
                }
            })
            .catch(error => {
                setError(error instanceof Error ? error.message : "Failed to fetch book");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [bookid]);

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

            <h3>Languages</h3>
            <p>{book.languages.join(", ")}</p>

            <h3>Download count</h3>
            <p>{book.download_count}</p>

            <h3>Subjects</h3>
            {book.subjects.map(subject => (
                <p key={subject}>{subject}</p>
            ))}

            <h3>Bookshelves</h3>
            {book.bookshelves.map(bookshelf => (
                <p key={bookshelf}>{bookshelf}</p>
            ))}

            <h3>Editors</h3>

            {book.editors.length > 0 ? book.editors.map(editor => <p key={editor.name}>{editor.name}</p>) : <p>None</p>}

            <h3>Summaries</h3>
            {book.summaries.map((summary, index) => (
                <p key={index}>{summary}</p>
            ))}

            <h3>Translators</h3>
            {book.translators.length > 0 ? (
                book.translators.map(translator => <p key={translator.name}>{translator.name}</p>)
            ) : (
                <p>None</p>
            )}
        </div>
    );
}
