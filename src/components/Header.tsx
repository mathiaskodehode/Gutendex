import { Link } from "react-router";
import CategoryMenu from "./CategoryMenu";
import SearchBar from "./SearchBar";

export default function Header() {
    return (
        <header className="site-header">
            <div className="header-container">
                <Link
                    to="/"
                    className="logo"
                >
                    GUTENDEX
                </Link>
                <SearchBar />
                <nav className="main-navigation">
                    <Link
                        to="/favorites"
                        className="favorites-link"
                    >
                        Favorites
                    </Link>
                    <CategoryMenu />
                </nav>
            </div>
        </header>
    );
}
