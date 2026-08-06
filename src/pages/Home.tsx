import BookList from "../components/BookList.tsx";
import Pagination from "../components/Pagination.tsx";

export default function Home() {
    return (
        <>
            <BookList />
            <Pagination />
        </>
    );
}
