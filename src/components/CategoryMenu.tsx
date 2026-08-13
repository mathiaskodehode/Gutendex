import { Link } from "react-router";
import categories from "../constants/bookCategories.ts";

export default function CategoryMenu() {
    return (
        <>
            {categories.map(category => (
                <Link
                    to={`/category/${category}`}
                    key={category}
                >
                    {category}
                </Link>
            ))}
        </>
    );
}
