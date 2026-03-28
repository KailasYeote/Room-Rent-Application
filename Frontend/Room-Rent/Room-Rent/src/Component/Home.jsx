import React, { useEffect, useState } from "react";
import { Loader, DeleteRoom } from "../RoomRent";
import { useNavigate } from "react-router-dom";
import { useSearch } from "./SearchContext";
import "./Home.css";
import RoomCarousal from "./RoomCarousal";
import Map from "./Map";
import "./Map.css";

export default function HomePage() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredRoomId, setHoveredRoomId] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const navigate = useNavigate();
    const { search, sortOrder } = useSearch();

    useEffect(() => {
        fetchRooms();
        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            setFavorites(new Set(JSON.parse(savedFavorites)));
        }
    }, []);

    // Save favorites to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify([...favorites]));
    }, [favorites]);

    async function fetchRooms() {
        try {
            const data = await Loader();
            setRooms(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error("❌ Error loading rooms:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id, e) {
        e.stopPropagation(); // Prevent triggering other click events
        if (!window.confirm("Are you sure you want to delete this room?")) return;
        try {
            await DeleteRoom(id);
            alert("✅ Room deleted successfully!");
            setRooms((prevRooms) => prevRooms.filter((r) => r.id !== id));
            // Remove from favorites if it was favorited
            setFavorites((prev) => {
                const newFavorites = new Set(prev);
                newFavorites.delete(id);
                return newFavorites;
            });
        } catch (error) {
            console.error("❌ Error deleting room:", error);
            alert("Failed to delete room. Please try again.");
        }
    }

    function toggleFavorite(id, e) {
        e.stopPropagation(); // Prevent triggering other click events
        setFavorites((prev) => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    }

    const filteredRooms = rooms
        .filter((room) => {
            if (!search) return true;
            const searchLower = search.toLowerCase();
            return (
                room.city?.toLowerCase().includes(searchLower) ||
                room.state?.toLowerCase().includes(searchLower) ||
                room.title?.toLowerCase().includes(searchLower) ||
                room.description?.toLowerCase().includes(searchLower)
            );
        })
        .sort((a, b) => {
            if (sortOrder === "high") {
                return b.pricePerMonth - a.pricePerMonth;
            } else if (sortOrder === "low") {
                return a.pricePerMonth - b.pricePerMonth;
            }
            return 0;
        });

    if (loading) return <div className="loading-text">🔄 Loading available rooms...</div>;
    if (!rooms.length) return <div className="loading-text">😔 No rooms available right now.</div>;
    if (!filteredRooms.length) return <div className="loading-text">😔 No rooms match your search criteria.</div>;

    return (
        <div className="home-container">
            <div className="home-header">
                <h1 className="home-title">
                    🏠 Find Your Perfect Room
                </h1>
                <p className="home-subtitle">
                    Discover verified listings, explore locations on the map, and save your favorites effortlessly.
                </p>
            </div>

            <div className="map-container-main">
                <Map rooms={filteredRooms} hoveredRoomId={hoveredRoomId} />
            </div>

            {search && (
                <p className="search-results-info">
                    Found {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} matching "{search}"
                </p>
            )}

            <div className="rooms-grid">
                {filteredRooms.map((room) => {
                    const isFavorite = favorites.has(room.id);
                    return (
                        <div
                            key={room.id}
                            className="room-card"
                            onMouseEnter={() => setHoveredRoomId(room.id)}
                            onMouseLeave={() => setHoveredRoomId(null)}
                        >
                            <div
                                className="image-wrapper"
                                onClick={() => navigate(`/viewDetails/${room.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                {/* Delete X button - only visible on image hover */}
                                <button
                                    className="delete-x-btn"
                                    onClick={(e) => handleDelete(room.id, e)}
                                    title="Delete room"
                                >
                                    ✕
                                </button>
                                <RoomCarousal
                                    photoUrls={room.photoUrls}
                                    title={room.title}
                                />
                            </div>
                            <div className="room-content">
                                <h2 className="room-title">{room.title || "Room for Rent"}</h2>
                                <p className="room-description">
                                    {room.description?.length > 80
                                        ? room.description.substring(0, 80) + "..."
                                        : room.description || "No description available."}
                                </p>
                                <div className="room-info">
                                    <p className="room-location">
                                        📍 {room.city}, {room.state}
                                    </p>
                                    <p className="room-price">₹{room.pricePerMonth}/month</p>
                                </div>
                                <div className="room-actions">
                                    <button
                                        className="view-btn"
                                        onClick={() => navigate(`/viewDetails/${room.id}`)}
                                    >
                                        👁️ View Details
                                    </button>
                                    <button
                                        className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                                        onClick={(e) => toggleFavorite(room.id, e)}
                                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        {isFavorite ? '❤️' : '🤍'} {isFavorite ? 'Favorited' : 'Favorite'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}