import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;
        navigate(`/search/${encodeURIComponent(trimmedQuery)}`);
    }

    return (
        <form
            className="search-form"
            onSubmit={handleSubmit}
        >
            <input
                type="search"
                placeholder="Search books..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Search books"
            />
            <button type="submit">Search</button>
        </form>
    );
}
