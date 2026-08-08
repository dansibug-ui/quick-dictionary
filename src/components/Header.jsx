import ThemeToggle from "./ThemeToggle";

function Header() {
    return (
        <header className="app-header">

            <div className="header-content">

                <h1>
                    📖 Dictionary Explorer
                </h1>

                <p>
                    Discover definitions, pronunciations, and learn a new word every day.
                </p>

            </div>

            <ThemeToggle />

        </header>
    );
}

export default Header;