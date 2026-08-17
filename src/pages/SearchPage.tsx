import { useParams } from "react-router";
import BookList from "../components/BookList.tsx";
import { useBooks } from "../context/BooksContext.tsx";
import { useEffect } from "react";

export default function SearchPage() {
    const { searchBooks } = useBooks();
    const { query } = useParams();

    useEffect(() => {
        searchBooks(query!);
    }, [query]);

    return <BookList />;
}
