import { useBooks } from "../context/BooksContext";

export default function Pagination() {
    const { data, loadPage } = useBooks();

    if (!data) return null;

    return (
        <div>
            <button
                disabled={!data.previous}
                onClick={() => data.previous && loadPage(data.previous)}
            >
                Previous
            </button>
            <button
                disabled={!data.next}
                onClick={() => data.next && loadPage(data.next)}
            >
                Next
            </button>
        </div>
    );
}
