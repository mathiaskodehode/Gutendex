import { createContext, useContext, useState, type ReactNode } from "react";

interface Book {
    id: number;
    title: string;
}

interface BooksResponse {
    results: Book[];
}

interface BooksContextType {
    data: BooksResponse | null;
    loading: boolean;
    error: string | null;
    fetchBooksByCategory: (category: string) => Promise<void>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<BooksResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchBooksByCategory(category: string) {
        setLoading(true);
        setError(null);

        try {
            const url = `https://gutendex.com/books?topic=${category}`;
            console.log("Fetching:", url);
            const res = await fetch(url);
            console.log("Status:", res.status);

            if (!res.ok) {
                throw new Error(`Request failed: ${res.status}`);
            }

            const json = await res.json();
            console.log("Response JSON:", json);
            setData(json);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <BooksContext.Provider
            value={{
                data,
                loading,
                error,
                fetchBooksByCategory,
            }}
        >
            {children}
        </BooksContext.Provider>
    );
}

export function useBooks() {
    const context = useContext(BooksContext);

    if (!context) {
        throw new Error("useBooks must be used inside BooksProvider");
    }

    return context;
}
