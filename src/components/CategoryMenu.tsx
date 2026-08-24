import { Link } from "react-router";
import categories from "../constants/bookCategories.ts";

export default function CategoryMenu() {
    return (
        <div className="category-menu">
            <Link
                to="/favorites"
                className="favorites-link category-link"
            >
                Favorites
            </Link>

            {categories.map(category => (
                <Link
                    to={`/category/${category}`}
                    key={category}
                    className="category-link"
                >
                    {category}
                </Link>
            ))}
        </div>
    );
}
