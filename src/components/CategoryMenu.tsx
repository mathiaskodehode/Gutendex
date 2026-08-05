import { useBooks } from "../context/BooksContext";
import categories from "../variables/bookCategories.ts";

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
