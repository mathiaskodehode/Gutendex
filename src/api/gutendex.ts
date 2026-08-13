import type BooksResponse from "../types/booksResponse.ts";

export async function fetchBooks(url: string): Promise<BooksResponse> {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch books");
    const data = response.json();
    console.log(data);
    return data;
}
