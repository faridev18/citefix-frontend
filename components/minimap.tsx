import { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix icônes pour Next.js/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src ?? markerIcon2x,
  iconUrl: markerIcon.src ?? markerIcon,
  shadowUrl: markerShadow.src ?? markerShadow,
});

export default function MiniMap({ coordinates = [6.37, 2.42], zoom = 16 }) {
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!leafletRef.current) {
      leafletRef.current = L.map(mapRef.current).setView(coordinates, zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(leafletRef.current);
    }
    if (markerRef.current) {
      markerRef.current.setLatLng(coordinates);
    } else {
      markerRef.current = L.marker(coordinates).addTo(leafletRef.current);
    }
    leafletRef.current.setView(coordinates, zoom);

    return () => {
      leafletRef.current && leafletRef.current.remove();
      leafletRef.current = null;
      markerRef.current = null;
    };
  }, [coordinates, zoom]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "300px", borderRadius: "8px", overflow: "hidden" }}
    />
  );
}
