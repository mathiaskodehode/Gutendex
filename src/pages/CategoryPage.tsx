import { useParams } from "react-router";
import { useEffect } from "react";
import { useBooks } from "../context/BooksContext.tsx";
import BookList from "../components/BookList";

export default function CategoryPage() {
    const { category } = useParams();
    const { fetchBooksByCategory } = useBooks();

    useEffect(() => {
        if (category) {
            fetchBooksByCategory(category);
        }
    }, [category]);

    return (
        <>
            <h1>{category}</h1>
            <BookList />
        </>
    );
}
