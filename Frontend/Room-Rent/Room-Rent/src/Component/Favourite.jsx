import React, { useEffect, useState } from "react";
import { Loader, DeleteRoom } from "../RoomRent";
import { useNavigate } from "react-router-dom";
import "./Favourite.css";
import RoomCarousal from "./RoomCarousal";

export default function FavoritesPage() {
    const [rooms, setRooms] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRooms();
        loadFavorites();
    }, []);

    // Load favorites from localStorage
    function loadFavorites() {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            try {
                setFavorites(new Set(JSON.parse(savedFavorites)));
            } catch (error) {
                console.error("Error loading favorites:", error);
                setFavorites(new Set());
            }
        }
    }

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
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this room?")) return;
        try {
            await DeleteRoom(id);
            alert("✅ Room deleted successfully!");
            setRooms((prev) => prev.filter((r) => r.id !== id));

            // Remove from favorites
            const newFavorites = new Set(favorites);
            newFavorites.delete(id);
            setFavorites(newFavorites);
            localStorage.setItem("favorites", JSON.stringify([...newFavorites]));
        } catch (error) {
            console.error("❌ Error deleting room:", error);
            alert("Failed to delete room. Please try again.");
        }
    }

    function toggleFavorite(id, e) {
        e.stopPropagation();
        const newFavorites = new Set(favorites);
        if (newFavorites.has(id)) newFavorites.delete(id);
        else newFavorites.add(id);

        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify([...newFavorites]));
    }

    // Filter only favorited rooms
    const favoriteRooms = rooms.filter((room) => favorites.has(room.id));

    if (loading)
        return <div className="loading-text">🔄 Loading favorites...</div>;

    if (!favoriteRooms.length) {
        return (
            <div className="home-container">
                <div className="favorites-header">
                    <h1 className="favorites-title">❤️ Your Favorite Rooms</h1>
                    <p className="favorites-count">No favorites added yet.</p>
                </div>
                <div className="loading-text">
                    💔 You haven't added any rooms to favorites yet.
                    <br />
                    <button
                        onClick={() => navigate("/home")}
                        style={{
                            marginTop: "20px",
                            padding: "12px 24px",
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "600"
                        }}
                    >
                        Browse Rooms
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            {/* HEADER */}
            <div className="favorites-header">
                <h1 className="favorites-title">❤️ Your Favorite Rooms</h1>
                <p className="favorites-count">
                    You have {favoriteRooms.length} favorite room
                    {favoriteRooms.length !== 1 ? "s" : ""}
                </p>
            </div>

            {/* HORIZONTAL FAVORITE LIST */}
            <div className="favorites-list">
                {favoriteRooms.map((room) => {
                    const isFavorite = favorites.has(room.id);
                    return (
                        <div
                            key={room.id}
                            className="favorite-item"
                            onClick={() => navigate(`/viewDetails/${room.id}`)}
                        >
                            {/* Image */}
                            <div className="favorite-image-wrapper">
                                <button
                                    className="favorite-delete-btn"
                                    onClick={(e) => handleDelete(room.id, e)}
                                >
                                    ✕
                                </button>
                                <RoomCarousal
                                    photoUrls={room.photoUrls}
                                    title={room.title}
                                />
                            </div>

                            {/* Details */}
                            <div className="favorite-details">
                                <h2 className="favorite-room-title">
                                    {room.title || "Room for Rent"}
                                </h2>
                                <p className="favorite-location">
                                    📍 {room.city}, {room.state}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="favorite-description">
                                <p>
                                    {room.description?.length > 100
                                        ? room.description.substring(0, 100) + "..."
                                        : room.description || "No description available."}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="favorite-price">
                                <span className="price-label">
                                    ₹{room.pricePerMonth}
                                </span>
                                <span className="price-period">/month</span>
                            </div>

                            {/* Actions */}
                            <div className="favorite-actions">
                                <button
                                    className="favorite-view-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/viewDetails/${room.id}`);
                                    }}
                                    title="View Details"
                                >
                                    👁️
                                </button>
                                <button
                                    className={`favorite-heart-btn ${isFavorite ? "is-favorite" : ""
                                        }`}
                                    onClick={(e) => toggleFavorite(room.id, e)}
                                    title={
                                        isFavorite
                                            ? "Remove from favorites"
                                            : "Add to favorites"
                                    }
                                >
                                    {isFavorite ? "❤️" : "🤍"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
