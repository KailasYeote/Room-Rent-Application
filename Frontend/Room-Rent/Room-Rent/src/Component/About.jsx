import React from "react";
import "./About.css";

function About() {
    return (
        <div className="about-container">
            <h1 className="about-title">🏠 About RoomRent Application</h1>

            <p className="about-intro">
                Welcome to <strong>RoomRent</strong> – your one-stop solution for finding and managing rental rooms easily.
                Our application is designed to make the process of listing, searching, and managing rental properties
                seamless for both owners and tenants.
            </p>

            <section className="about-section">
                <h2>✨ Key Features</h2>
                <ul>
                    <li>📌 Add and manage room listings with details like address, city, price, and description.</li>
                    <li>🔍 View all available rooms with easy-to-read details.</li>
                    <li>🗑 Delete or update room listings instantly.</li>
                    <li>💰 Transparent pricing with monthly rent displayed clearly.</li>
                    <li>📅 Auto-generated timestamps for created and updated rooms.</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>💡 Why Choose RoomRent?</h2>
                <p>
                    Whether you are a property owner or a tenant, RoomRent helps you save time and effort.
                    Owners can post rooms within seconds, while tenants can browse verified listings with ease.
                    Our clean design ensures smooth navigation and user-friendly experience.
                </p>
            </section>

            <section className="about-section">
                <h2>📞 Contact Us</h2>
                <p>
                    Have questions or feedback? We’d love to hear from you!
                    <br /> Email: <a href="mailto:support@roomrent.com">support@roomrent.com</a>
                    <br /> Phone: +91 98765 43210
                </p>
            </section>
        </div>
    );
}

export default About;