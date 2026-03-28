import "./AddDetails.css";
import { useState } from "react";
import { createRoom } from "../RoomRent";
import { useNavigate } from "react-router-dom";

function AddDetails() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        pricePerMonth: "",
        ownerEmail: "",
        latitude: "",
        longitude: "",
    });

    const [photoFiles, setPhotoFiles] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setPhotoFiles(files);
            setPreview(URL.createObjectURL(files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            if (photoFiles) {
                for (let i = 0; i < photoFiles.length; i++) {
                    data.append("photoFiles", photoFiles[i]);
                }
            }

            await createRoom(data);
            setMessage({ type: "success", text: "✅ Room added successfully!" });

            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "❌ Failed to add room" });
        }
    };

    return (
        <div className="add-room-container">
            <h2 className="form-title">🏠 Add New Room</h2>

            {message && (
                <p className={`message ${message.type}`}>{message.text}</p>
            )}

            <form
                onSubmit={handleSubmit}
                className="add-room-form"
                encType="multipart/form-data"
            >
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
                <input type="number" name="pricePerMonth" placeholder="Price per Month" value={formData.pricePerMonth} onChange={handleChange} required />
                <input type="email" name="ownerEmail" placeholder="Owner Email Address" value={formData.ownerEmail} onChange={handleChange} required />

                <p className="form-helper-text">
                    Right-click on Google Maps to get coordinates.
                </p>
                <div className="lat-long-inputs">
                    <input
                        type="number"
                        step="any"
                        name="latitude"
                        placeholder="Latitude (e.g., 20.5937)"
                        value={formData.latitude}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        step="any"
                        name="longitude"
                        placeholder="Longitude (e.g., 78.9629)"
                        value={formData.longitude}
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="file"
                    name="photoFiles"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                />

                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="Room Preview" />
                        {photoFiles && photoFiles.length > 1 && (
                            <p>{photoFiles.length} photos selected</p>
                        )}
                    </div>
                )}

                <button type="submit" className="submit-btn">
                    ➕ Add Room
                </button>
            </form>
        </div>
    );
}

export default AddDetails;