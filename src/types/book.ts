export default interface Book {
    id: number;
    title: string;
    authors: {
        name: string;
        birth_year: number | null;
        death_year: number | null;
    }[];
    summaries: string[];
    editors: {
        name: string;
        birth_year: number | null;
        death_year: number | null;
    }[];
    translators: {
        name: string;
        birth_year: number | null;
        death_year: number | null;
    }[];
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean;
    media_type: string;
    formats: {
        [key: string]: string;
    };
    download_count: number;
}
