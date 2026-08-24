import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import type BooksResponse from "../types/booksResponse.ts";
import type BooksContextType from "../types/booksContextType.ts";
import type Book from "../types/book.ts";
import { fetchBooks } from "../api/gutendex.ts";

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<BooksResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const responseCache = useRef<Record<string, BooksResponse>>({});
    const bookCache = useRef<Record<number, Book>>({});
    const inFlightRequests = useRef<Record<string, Promise<BooksResponse>>>({});
    const latestRequestId = useRef(0);

    async function fetchAndCache(url: string): Promise<BooksResponse> {
        const cachedResponse = responseCache.current[url];
        if (cachedResponse) return cachedResponse;
        const existingRequest = inFlightRequests.current[url];
        if (existingRequest) return existingRequest;
        const request = fetchBooks(url)
            .then(response => {
                responseCache.current[url] = response;
                for (const book of response.results) {
                    bookCache.current[book.id] = book;
                }

                return response;
            })
            .finally(() => {
                delete inFlightRequests.current[url];
            });
        inFlightRequests.current[url] = request;
        return request;
    }

    async function fetchBookList(url: string) {
        const requestId = ++latestRequestId.current;
        const cachedResponse = responseCache.current[url];

        if (cachedResponse) {
            setData(cachedResponse);
            setError(null);
            setLoading(false);
            return cachedResponse;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetchAndCache(url);
            if (requestId === latestRequestId.current) {
                setData(response);
                setLoading(false);
            }
            return response;
        } catch (e) {
            if (requestId === latestRequestId.current) {
                setError(e instanceof Error ? e.message : "Unknown error");
                setLoading(false);
            }
            throw e;
        }
    }

    async function fetchBooksByCategory(category: string) {
        await fetchBookList(`https://gutendex.com/books?topic=${encodeURIComponent(category)}`);
    }

    async function searchBooks(query: string) {
        await fetchBookList(`https://gutendex.com/books?search=${encodeURIComponent(query)}`);
    }

    async function loadPage(url: string) {
        await fetchBookList(url);
    }

    async function getBookById(id: number): Promise<Book | undefined> {
        const cachedBook = bookCache.current[id];
        if (cachedBook) return cachedBook;
        const response = await fetchAndCache(`https://gutendex.com/books?ids=${id}`);
        return response.results[0];
    }

    return (
        <BooksContext.Provider
            value={{
                data,
                loading,
                error,
                fetchBooksByCategory,
                getBookById,
                searchBooks,
                loadPage,
            }}
        >
            {children}
        </BooksContext.Provider>
    );
}

export function useBooks() {
    const context = useContext(BooksContext);
    if (!context) throw new Error("useBooks must be used inside BooksProvider");
    return context;
}
