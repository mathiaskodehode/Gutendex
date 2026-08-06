import type Book from "./book.ts";

export default interface BooksResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Book[];
}
