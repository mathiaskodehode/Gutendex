import { useParams, useSearchParams } from "react-router";
import { useEffect } from "react";
import { useBooks } from "../context/BooksContext.tsx";
import BookList from "../components/BookList";

export default function CategoryPage() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const { fetchBooksByCategory } = useBooks();

    const page: number = Number(searchParams.get("page")) || 1;
    useEffect(() => {
        if (category) fetchBooksByCategory(category, page);
    }, [category, page]);

    return (
        <>
            <h1>{category}</h1>
            <BookList />
        </>
    );
}
