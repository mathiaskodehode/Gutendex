import { useParams } from "react-router";

export default function BookDetailsPage() {
    const { bookid } = useParams();
    return <>BOOK DETAILS PAGE - {bookid}</>;
}
