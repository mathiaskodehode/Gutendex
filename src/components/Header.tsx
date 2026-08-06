import CategoryMenu from "./CategoryMenu";
import SearchBar from "./SearchBar";

export default function Header() {
    return (
        <header>
            <h1>GUTENDEX</h1>
            <SearchBar />
            <CategoryMenu />
        </header>
    );
}
