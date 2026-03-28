import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

export default function Contact() {
    const location = useLocation();
    const { ownerEmail, roomTitle } = location.state || {}; // ✅ Using ownerEmail

    const [form, setForm] = useState({
        name: "",
        phone: "",
        message: "",
        ownerEmail: ownerEmail || "",
        roomTitle: roomTitle || "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/Room/v1/contact", form);
            toast.success("✅ Message sent to owner successfully!");
            setForm({
                name: "",
                phone: "",
                message: "",
                ownerEmail,
                roomTitle,
            });
        } catch (error) {
            console.error("❌ Error submitting contact form:", error);
            toast.error("❌ Failed to send message.");
        }
    };

    return (
        <div className="contact-page">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="contact-box">
                <div className="contact-info">
                    <h2>📞 Contact Owner</h2>
                    {roomTitle && <p className="contact-room-title">Room: <strong>{roomTitle}</strong></p>}
                    <p>Leave your contact details below, and the owner will reach you shortly.</p>

                    <div className="owner-info">
                        <p><strong>📧 Owner Email:</strong></p>
                        <p className="owner-email-address">{ownerEmail || "Not Available"}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <h3>Send Your Message</h3>
                    <input
                        type="text"
                        name="name"
                        g placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows="4"
                        value={form.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit" className="submit-btn">Send Message</button>
                    </form>
            </div>
        </div>
    );
}