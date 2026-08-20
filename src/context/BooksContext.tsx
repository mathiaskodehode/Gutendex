import { createContext, useContext, useState, useRef, type ReactNode } from "react";
import type BooksResponse from "../types/booksResponse.ts";
import type BooksContextType from "../types/booksContextType.ts";
import { fetchBooks } from "../api/gutendex.ts";

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<BooksResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const clientCache = useRef<Record<string, BooksResponse>>({});
    const abortControllerRef = useRef<AbortController | null>(null);

    async function executeBookFetch(url: string, updateData = true) {
        if (clientCache.current[url]) {
            const cachedData = clientCache.current[url];
            if (updateData) setData(cachedData);
            return cachedData;
        }
        if (updateData && abortControllerRef.current) {
            abortControllerRef.current.abort();
            console.log("aborted old unfinished fetching");
        }
        const controller = new AbortController();
        if (updateData) {
            abortControllerRef.current = controller;
        }

        setLoading(true);
        setError(null);

        try {
            const fetchedData = await fetchBooks(url, { signal: controller.signal });
            clientCache.current[url] = fetchedData;
            if (updateData) setData(fetchedData);
            return fetchedData;
        } catch (e) {
            if (e instanceof Error && e.name === "AbortError") {
                return null;
            }
            setError(e instanceof Error ? e.message : "Unknown error");
            throw e;
        } finally {
            if (!updateData || abortControllerRef.current === controller) {
                setLoading(false);
            }
        }
    }

    async function fetchBooksByCategory(category: string) {
        await executeBookFetch(`https://gutendex.com/books?topic=${category}`);
    }

    async function getBookById(id: number) {
        return (await executeBookFetch(`https://gutendex.com/books?ids=${id}`, false))?.results[0];
    }

    async function searchBooks(query: string) {
        await executeBookFetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`);
    }

    async function loadPage(url: string) {
        await executeBookFetch(url);
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
