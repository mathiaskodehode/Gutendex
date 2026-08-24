import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useBooks } from "../context/BooksContext";

export default function Pagination() {
    const { data } = useBooks();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    if (!data) return null;

    const currentPage = Number(searchParams.get("page")) || 1;
    const goToPage = (page: number) => {
        navigate(`${location.pathname}?page=${page}`);
    };

    return (
        <div className="pagination">
            <button
                disabled={!data.previous}
                onClick={() => goToPage(currentPage - 1)}
            >
                Previous
            </button>
            <span>Page {currentPage}</span>
            <button
                disabled={!data.next}
                onClick={() => goToPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}
