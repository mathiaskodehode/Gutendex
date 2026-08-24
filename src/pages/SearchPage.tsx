import { useParams, useSearchParams } from "react-router";
import BookList from "../components/BookList.tsx";
import { useBooks } from "../context/BooksContext.tsx";
import { useEffect } from "react";

export default function SearchPage() {
    const { searchBooks } = useBooks();
    const { query } = useParams();
    const [searchParams] = useSearchParams();

    const page: number = Number(searchParams.get("page")) || 1;
    useEffect(() => {
        if (query) searchBooks(query, page);
    }, [query, page]);

    return (
        <>
            <h1>Showing search results for "{query}"</h1>
            <BookList />
        </>
    );
}
