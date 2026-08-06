import { useBooks } from "../context/BooksContext";

export default function Pagination() {
    const { data, loadPage } = useBooks();

    if (!data) return null;

    const getPage = () => {
        if (!data.previous) return 1;

        const previousUrl = new URL(data.previous);
        const previousPage = Number(previousUrl.searchParams.get("page") ?? "1");

        return previousPage + 1;
    };

    return (
        <div>
            <button
                disabled={!data.previous}
                onClick={() => data.previous && loadPage(data.previous)}
            >
                Previous
            </button>
            Page {getPage()}
            <button
                disabled={!data.next}
                onClick={() => data.next && loadPage(data.next)}
            >
                Next
            </button>
        </div>
    );
}
