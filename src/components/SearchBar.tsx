import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        setQuery(query.trim());
        navigate(`/search/${query}`);
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
