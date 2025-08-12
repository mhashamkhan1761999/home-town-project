import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customMarkerIcon = L.divIcon({
    html: `
      <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12C0 20.25 12 40 12 40C12 40 24 20.25 24 12C24 5.373 18.627 0 12 0Z" fill="#D4BC6D"/>
        <circle cx="12" cy="12" r="4" fill="#FFFFFF"/>
      </svg>
    `,
    className: 'custom-marker',
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [0, -40],
});


const locations = [
    { id: 1, lat: 51.505, lng: -0.09, name: 'London', orders: 51 },
    { id: 2, lat: 48.8566, lng: 2.3522, name: 'Paris', orders: 51 },
    { id: 3, lat: 34.0522, lng: -118.2437, name: 'Los Angeles', orders: 51 },
    { id: 4, lat: 35.6895, lng: 139.6917, name: 'Tokyo', orders: 51 },
    { id: 5, lat: -33.8688, lng: 151.2093, name: 'Sydney', orders: 51 },
    { id: 6, lat: 40.7128, lng: -74.0060, name: 'New York', orders: 51 },
    { id: 7, lat: 30.0444, lng: 31.2357, name: 'Cairo', orders: 51 },
    { id: 8, lat: -23.5505, lng: -46.6333, name: 'São Paulo', orders: 51 },
    { id: 9, lat: 19.0760, lng: 72.8777, name: 'Mumbai', orders: 51 },
    { id: 10, lat: 55.7558, lng: 37.6173, name: 'Moscow', orders: 51 },
    { id: 11, lat: 28.6139, lng: 77.2090, name: 'Delhi', orders: 51 },
    { id: 12, lat: 39.9042, lng: 116.4074, name: 'Beijing', orders: 51 },
    { id: 13, lat: 37.7749, lng: -122.4194, name: 'San Francisco', orders: 51 },
    { id: 14, lat: 52.5200, lng: 13.4050, name: 'Berlin', orders: 51 },
];


// Component to adjust map bounds
const SetMapBounds = ({ positions }) => {
    const map = useMap();
    useEffect(() => {
        if (positions.length > 0) {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map, positions]);
    return null;
};

const LeafLetMap = () => {

    const position = [51.505, -0.09]


    // Example data for markers (you can fetch this from an API)


    const positions = locations.map(order => [order.lat, order.lng]);

    return (
        <>
            <MapContainer center={position} zoom={2} scrollWheelZoom={false} style={{ height: '400px', width: '100%', backgroundColor: '#1A1A1A' }}>
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[51.505, -0.09]} icon={customMarkerIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <SetMapBounds positions={positions} />
                {locations.map(location => (
                    <Marker key={location.id} position={[location.lat, location.lng]} icon={customMarkerIcon}>
                        <Popup>
                            <strong>{location.name}</strong> <br /> {location.orders} Orders
                        </Popup>
                    </Marker>
                ))}
            </MapContainer >
        </>
    )
}

export default LeafLetMap