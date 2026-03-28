import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import "./Map.css";

// --- ⚠️ PASTE YOUR API KEY HERE ---
const API_KEY ="AIzaSyCko7UihcZk9JqQwGtoxGpL0Zfok-j6Aik";
// ---------------------------------

const containerStyle = {
    width: '100%',
    height: '100%'
};

// Center the map on India by default
const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629
};

function MapComponent({ rooms }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    });

    const [selectedRoom, setSelectedRoom] = useState(null);

    if (!isLoaded) return <div className="map-loading">Loading Map...</div>;

    // Filter out rooms that don't have valid coordinates
    const markers = rooms.filter(room => room.latitude && room.longitude);

    return (
        <GoogleMap
            mapContainerClassName='map-container-inner'
            center={defaultCenter}
            zoom={5}
        >
            {markers.map((room) => (
                <MarkerF
                    key={room.id}
                    position={{
                        lat: room.latitude,
                        lng: room.longitude
                    }}
                    onClick={() => {
                        setSelectedRoom(room);
                    }}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Simple red pin icon
                    }}
                />
            ))}

            {selectedRoom && (
                <InfoWindowF
                    position={{
                        lat: selectedRoom.latitude,
                        lng: selectedRoom.longitude
                    }}
                    onCloseClick={() => {
                        setSelectedRoom(null);
                    }}
                >
                    <div className="map-infowindow">
                        <h4>{selectedRoom.title}</h4>
                        <p>📍 {selectedRoom.city}</p>
                        <p><strong>₹{selectedRoom.pricePerMonth}/month</strong></p>
                    </div>
                </InfoWindowF>
            )}
        </GoogleMap>
    );
}

export default React.memo(MapComponent);