import SearchBar from "../components/SearchBar.tsx";

export default function Home() {
    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="home-hero-content">
                    <h1 className="home-hero-title">GUTENDEX</h1>
                    <div className="home-search">
                        <SearchBar />
                        <p>Try a title or author, such as "Frankenstein", "Jane Austen", or "Mark Twain".</p>
                    </div>
                </div>
            </section>

            <section className="home-about">
                <p className="home-section-label">ABOUT</p>
                <h2>Lorem ipsum</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                </p>
            </section>
        </div>
    );
}
