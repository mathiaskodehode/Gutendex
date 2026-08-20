import type BooksResponse from "../types/booksResponse.ts";

export async function fetchBooks(url: string, options?: { signal?: AbortSignal }): Promise<BooksResponse> {
    console.log("fetching from", url);
    const response = await fetch(url, { signal: options?.signal });
    if (!response.ok) throw new Error("Failed to fetch books");
    const data = await response.json();
    console.log(data);
    return data;
}
