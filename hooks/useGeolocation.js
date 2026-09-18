import { useState, useCallback } from "react";

export function useGeolocation() {
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState("");

  const locate = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const message = "Geolocation isn't supported by this browser.";
        setLocateError(message);
        reject(new Error(message));
        return;
      }

      setLocating(true);
      setLocateError("");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocating(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setLocating(false);
          const message =
            err.code === err.PERMISSION_DENIED
              ? "Location permission denied. Allow access or search by city instead."
              : "Couldn't get your location. Try searching by city instead.";
          setLocateError(message);
          reject(new Error(message));
        },
        { enableHighAccuracy: false, timeout: 10000 }
      );
    });
  }, []);

  return { locate, locating, locateError };
}