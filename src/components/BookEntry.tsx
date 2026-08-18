import { Link } from "react-router";
import type Book from "../types/book.ts";
import FavoriteButton from "./FavoriteButton.tsx";

export default function BookEntry(book: Book) {
    const coverImage = book.formats["image/jpeg"];

    return (
        <article className="book-card">
            <Link
                to={`/book/${book.id}`}
                className="book-cover-link"
            >
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={`Cover of ${book.title}`}
                        className="book-cover"
                    />
                ) : (
                    <div className="book-cover-placeholder">No cover</div>
                )}
            </Link>

            <div className="book-card-content">
                <Link
                    to={`/book/${book.id}`}
                    className="book-title"
                >
                    {book.title}
                </Link>
                <p className="book-author">
                    {book.authors.length > 0 ? book.authors.map(author => author.name).join(", ") : "Unknown author"}
                </p>

                <FavoriteButton {...book} />
            </div>
        </article>
    );
}
