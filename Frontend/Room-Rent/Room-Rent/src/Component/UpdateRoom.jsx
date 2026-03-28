// src/pages/UpdateRoom.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomById, updateRoom } from "../RoomRent";
import "./UpdateRoom.css";

function UpdateRoom() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        pricePerMonth: "",
        photoUrl: "" // ✅ added photo field
    });
    const [loading, setLoading] = useState(true);

    // Load existing room details
    useEffect(() => {
        async function fetchRoom() {
            try {
                const data = await getRoomById(id);
                setFormData(data);
                setLoading(false);
            } catch (error) {
                console.error("❌ Failed to fetch room:", error);
                setLoading(false);
            }
        }
        fetchRoom();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateRoom(id, formData);
            alert("✅ Room updated successfully!");
            navigate("/home");
        } catch (error) {
            console.error("❌ Failed to update room:", error);
            alert("Update failed. Try again.");
        }
    };

    if (loading) return <p>Loading room data...</p>;

    return (
        <div className="form-container">
            <h2>🛠️ Update Room</h2>
            <form onSubmit={handleSubmit} className="room-form">
                <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                />
                <input
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                    placeholder="City"
                    required
                />
                <input
                    type="text"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                    placeholder="State"
                    required
                />
                <input
                    type="text"
                    name="pincode"
                    value={formData.pincode || ""}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                />
                <input
                    type="number"
                    name="pricePerMonth"
                    value={formData.pricePerMonth || ""}
                    onChange={handleChange}
                    placeholder="Price per Month"
                    required
                />

                {/* ✅ New photo URL input */}
                <input
                    type="text"
                    name="photoUrl"
                    value={formData.photoUrl || ""}
                    onChange={handleChange}
                    placeholder="Photo URL (e.g. https://example.com/image.jpg)"
                />

                {/* ✅ Live image preview */}
                {formData.photoUrl && (
                    <div className="photo-preview">
                        <img
                            src={formData.photoUrl}
                            alt="Room Preview"
                            onError={(e) => (e.target.style.display = "none")}
                        />
                    </div>
                )}

                <button type="submit" className="update-btn">💾 Save Changes</button>
            </form>
        </div>
    );
}

export default UpdateRoom;
