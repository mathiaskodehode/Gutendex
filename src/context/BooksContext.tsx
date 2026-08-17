import { createContext, useContext, useState, type ReactNode } from "react";
import type BooksResponse from "../types/booksResponse.ts";
import type BooksContextType from "../types/booksContextType.ts";
import { fetchBooks } from "../api/gutendex.ts";

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<BooksResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function executeBookFetch(url: string) {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchBooks(url);
            setData(data);
            return data;
        } catch (e) {
            setError(e instanceof Error ? e.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }
    async function fetchBooksByCategory(category: string) {
        await executeBookFetch(`https://gutendex.com/books?topic=${category}`);
    }
    async function getBookById(id: number) {
        return (await fetchBooks(`https://gutendex.com/books?ids=${id}`)).results[0];
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
                getBookById: getBookById,
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
