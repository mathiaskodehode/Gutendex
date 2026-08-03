import { useState } from "react";

const categories: string[] = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
];

export default function CategoryMenu() {
    const [data, setData] = useState<any>(null);
    async function onCategoryClick(category: string) {
        try {
            const json = await fetchBooks(category);
            setData(json);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            {categories.map(c => (
                <button
                    key={c}
                    onClick={() => onCategoryClick(c)}
                >
                    {c}
                </button>
            ))}
        </>
    );
}

async function fetchBooks(category: string) {
    const url = `https://gutendex.com/books?topic=${category}`;
    console.log("Fetching:", url);
    const res = await fetch(url);
    console.log("Status:", res.status);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} - ${text}`);
    }

    const json = await res.json();
    console.log("Response JSON:", json);
    return json;
}
