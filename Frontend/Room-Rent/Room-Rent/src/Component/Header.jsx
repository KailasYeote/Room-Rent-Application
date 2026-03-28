import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import { useSearch } from "./SearchContext";

export default function Header() {
    const { search, setSearch, sortOrder, setSortOrder } = useSearch();
    const location = useLocation();
    const showControls = location.pathname === "/home" || location.pathname === "/";

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo">
                    <Link to="/">RoomRent</Link>
                </div>

                <div className="header-right">
                    <nav className="header-nav">
                        <ul>
                            <li>
                                <NavLink
                                    to="/home"
                                    className={({ isActive }) => (isActive ? "active-link" : "")}
                                    end
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/add-room"
                                    className={({ isActive }) => (isActive ? "active-link" : "")}
                                >
                                    Add Room
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) => (isActive ? "active-link" : "")}
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/favorites"
                                    className={({ isActive }) => (isActive ? "active-link" : "")}
                                >
                                    ❤️ Favorites
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    {showControls && (
                        <div className="controls-bar-header">
                            <input
                                type="text"
                                placeholder="Search by city..."
                                className="search-input-header"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <select
                                className="sort-select-header"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="">Sort by Price</option>
                                <option value="high">High → Low</option>
                                <option value="low">Low → High</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}