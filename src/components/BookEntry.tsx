import { Link } from "react-router";
import type Book from "../types/book.ts";
import FavoriteButton from "./FavoriteButton.tsx";

export default function BookEntry(book: Book) {
    return (
        <>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
            <FavoriteButton {...book} />
        </>
    );
}
