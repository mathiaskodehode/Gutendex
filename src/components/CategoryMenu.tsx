import { useBooks } from "../context/BooksContext";

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
    const { fetchBooksByCategory } = useBooks();

    return (
        <>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => fetchBooksByCategory(category)}
                >
                    {category}
                </button>
            ))}
        </>
    );
}
