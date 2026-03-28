import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomById } from "../RoomRent";
import "./ViewDetails.css"; // Your existing CSS
import RoomCarousel from "./RoomCarousal";

export default function ViewDetails() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRoomDetails() {
            try {
                const selectedRoom = await getRoomById(id);
                setRoom(selectedRoom || null);
            } catch (error) {
                console.error("❌ Error fetching room details:", error);
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            fetchRoomDetails();
        }
    }, [id]);

    if (loading) return <div className="details-loading">🔄 Loading room details...</div>;
    if (!room) return <div className="details-error">❌ Room not found.</div>;

    // ✅ 2. The old 'imageUrl' logic is deleted. We don't need it.

    return (
        <div className="details-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="details-card">

                {/* ✅ 3. Replaced the <img> tag with the RoomCarousel component */}
                {/* This wrapper div uses your old 'details-image' class */}
                {/* to help maintain your existing CSS. */}
                <div className="details-image">
                    <RoomCarousel
                        photoUrls={room.photoUrls}
                        title={room.title}
                    />
                </div>

                <div className="details-content">
                    <h1 className="details-title">{room.title || "Room for Rent"}</h1>
                    <p className="details-price">₹{room.pricePerMonth}/month</p>

                    <div className="details-section">
                        <h2>📝 Description</h2>
                        <p className="details-description">
                            {room.description || "No description available."}
                        </p>
                    </div>

                    <div className="details-section">
                        <h2>📍 Location</h2>
                        <div className="details-info">
                            {/* We can show more details to make it "attractive" */}
                            <p><strong>Address:</strong> {room.address}</p>
                            <p><strong>City:</strong> {room.city}</p>
                            <p><strong>State:</strong> {room.state}</p>
                            <p><strong>Pincode:</strong> {room.pincode}</p>
                        </div>
                    </div>

                    <button
                        className="contact-btn"
                        onClick={() => navigate(`/contact`, {
                            state: {
                                ownerEmail: room.ownerEmail,
                                roomTitle: room.title
                            }
                        })}
                    >
                        📞 Contact Owner
                    </button>
                </div>
            </div>
        </div>
    );
}