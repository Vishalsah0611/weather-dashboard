import httpClient from "./httpClient";

export async function fetchForecastByCoords(latitude, longitude) {
  const response = await httpClient.get("/forecast", {
    params: {
      lat: latitude,
      lon: longitude,
    },
  });

  return {
    location: response.data.city,
    slots: response.data.list,
    timezoneOffset: response.data.city.timezone,
  };
}

export async function fetchCurrentByCoords(latitude, longitude) {
  const response = await httpClient.get("/weather", {
    params: {
      lat: latitude,
      lon: longitude,
    },
  });

  return response.data;
}

export async function fetchCoordinatesByCity(cityName) {
  const response = await httpClient.get(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: cityName,
        limit: 1,
      },
    }
  );

  if (!response.data.length) {
    throw new Error("City not found");
  }

  return response.data[0];
}

export async function fetchAirPollution(latitude, longitude) {
  const response = await httpClient.get("/air_pollution", {
    params: {
      lat: latitude,
      lon: longitude,
    },
  });

  return response.data;
}