// src/components/RoomCarousel.js
// Make sure to run: npm install react-responsive-carousel

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import css
import "./RoomCarousal.css"; // We'll add a little custom CSS


// Helper to build the full image URL
function getFullImageUrl(url) {
    if (!url) {
        return "/placeholder-room.jpg"; // Your default placeholder
    }
    if (url.startsWith("http")) {
        return url;
    }
    // Assumes your Spring app is on 8080 and serves static files from '/uploads'
    return `http://localhost:8080${url}`;
}

export default function RoomCarousel({ photoUrls, title }) {
    const safePhotoUrls = Array.isArray(photoUrls) ? photoUrls : [];

    // 1. No photos: Show placeholder
    if (safePhotoUrls.length === 0) {
        return (
            <img
                src="/placeholder-room.jpg"
                alt="Placeholder"
                className="room-image"
            />
        );
    }

    // 2. Only one photo: Show a single image, no carousel
    if (safePhotoUrls.length === 1) {
        return (
            <img
                src={getFullImageUrl(safePhotoUrls[0])}
                alt={title || "Room Photo"}
                className="room-image"
                onError={(e) => (e.target.src = "/placeholder-room.jpg")}
            />
        );
    }

    // 3. Multiple photos: Show the carousel
    return (
        <Carousel
            showThumbs={false}   // Hides thumbnail navigation
            showStatus={false}   // Hides "1 of 3" status
            infiniteLoop={true}  // Loops back to the start
            autoPlay={true}
            interval={3500}
        >
            {safePhotoUrls.map((url, index) => (
                <div key={index}>
                    <img
                        src={getFullImageUrl(url)}
                        alt={`${title || "Room Photo"} ${index + 1}`}
                        className="room-image"
                        onError={(e) => (e.target.src = "/placeholder-room.jpg")}
                    />
                </div>
            ))}
        </Carousel>
    );
}