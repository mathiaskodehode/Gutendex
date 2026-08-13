import type BooksResponse from "./booksResponse.ts";

export default interface BooksContextType {
    data: BooksResponse | null;
    loading: boolean;
    error: string | null;
    currentCategory: string | null;
    fetchBooksByCategory: (category: string) => Promise<void>;
    fetchBookById: (id: number) => Promise<void>;
    searchBooks: (query: string) => Promise<void>;
    loadPage: (url: string) => Promise<void>;
}
