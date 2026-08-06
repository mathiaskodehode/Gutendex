import { useState } from "react";
import { useBooks } from "../context/BooksContext";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const { searchBooks } = useBooks();

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        if (!query.trim()) return;

        searchBooks(query);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="search"
                placeholder="Search books..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />

            <button type="submit">Search</button>
        </form>
    );
}
