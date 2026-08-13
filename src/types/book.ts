export default interface Book {
    id: number;
    title: string;
    authors: {
        name: string;
        birth_year: number | null;
        death_year: number | null;
    }[];
    subjects: string[];
    languages: string[];
    download_count: number;
    formats: {
        [key: string]: string;
    };
    bookshelves: string[];
    editors: string[];
    summaries: string[];
    translators: string[];
}
