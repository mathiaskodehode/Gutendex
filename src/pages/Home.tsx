import SearchBar from "../components/SearchBar.tsx";

export default function Home() {
    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="home-hero-content">
                    <h1 className="home-hero-title">GUTENDEX</h1>
                    <div className="home-search">
                        <SearchBar />
                        <p>Try a title or author.</p>
                    </div>
                </div>
            </section>

            <section className="home-about">
                <p className="home-section-label">ABOUT</p>
                <h2>Discover books from Project Gutenberg</h2>
                <p>
                    Browse thousands of freely available books through the Gutendex API. Search for a specific title, explore categories, or save your favorites
                    for later.
                </p>
            </section>
        </div>
    );
}
