import BookList from "../components/BookList.tsx";
import SearchBar from "../components/SearchBar.tsx";

export default function Home() {
    return (
        <>
            <SearchBar />
            <BookList />
        </>
    );
}
