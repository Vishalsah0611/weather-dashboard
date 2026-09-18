import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { getWeatherMapUrl } from "../utils/weatherMap";

export default function WeatherMap({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (latitude == null || longitude == null) {
      return;
    }

    const map = L.map("weather-map").setView([latitude, longitude], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    L.tileLayer(getWeatherMapUrl("temp_new"), {
      opacity: 0.55,
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude]);

  return (
    <div className="weather-map-container">
      <div id="weather-map" className="weather-map" />
    </div>
  );
}