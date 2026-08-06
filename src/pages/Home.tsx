import BookList from "../components/BookList.tsx";
import Favorites from "../components/Favorites.tsx";
import Pagination from "../components/Pagination.tsx";
export default function Home() {
    return (
        <>
            <Favorites />
            <BookList />
            <Pagination />
        </>
    );
}
