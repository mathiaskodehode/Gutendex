import type BooksResponse from "./booksResponse.ts";
import type Book from "./book.ts";

export default interface BooksContextType {
    data: BooksResponse | null;
    loading: boolean;
    error: string | null;
    fetchBooksByCategory: (category: string) => Promise<void>;
    getBookById: (id: number) => Promise<Book | undefined>;
    searchBooks: (query: string) => Promise<void>;
    loadPage: (url: string) => Promise<void>;
}
