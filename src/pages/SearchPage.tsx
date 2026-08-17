import { useParams } from "react-router";
import BookList from "../components/BookList.tsx";
import { useBooks } from "../context/BooksContext.tsx";
import { useEffect } from "react";

export default function SearchPage() {
    const { searchBooks } = useBooks();
    const { query } = useParams();

    useEffect(() => {
        if (query) {
            searchBooks(query);
        }
    }, [query]);

    return (
        <>
            <h1>Showing search results for "{query}"</h1>
            <BookList />
        </>
    );
}
