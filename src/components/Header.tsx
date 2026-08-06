import { Link } from "react-router";
import CategoryMenu from "./CategoryMenu";
import SearchBar from "./SearchBar";

export default function Header() {
    return (
        <header>
            <h1>GUTENDEX</h1>
            <SearchBar />
            <CategoryMenu />
            <Link to="/favorites">Favorites</Link>
        </header>
    );
}
