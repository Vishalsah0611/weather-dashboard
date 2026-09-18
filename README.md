# WeatherScope

A small React + Vite dashboard for OpenWeatherMap's **5 day / 3 hour forecast** API.
Search any city, or share your location, and browse the next five days of
3-hour weather slots, air quality, and a map — all in one place.

## Features

- City search (with validation) or "Use my location" via browser geolocation
- Current conditions card (temp, feels-like, humidity, wind)
- 5-day forecast with day tabs
  - **Default view**: all days' slots are shown at once
  - Click a day tab to filter down to just that day
  - Click the same day tab again to go back to showing all days
  - Today's tab is highlighted by default even before you click anything
- Air quality (AQI + PM2.5, PM10, CO, NO₂, O₃, SO₂)
- Location map (Leaflet + OpenStreetMap)

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Get a free API key from https://openweathermap.org/api (the "5 Day / 3 Hour
   Forecast" plan) and copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
   Then set `VITE_OPENWEATHER_KEY` to your key. New keys can take a little while
   to activate.
3. Run the dev server:
   ```
   npm run dev
   ```

## Tech stack

- React 19 + Vite
- react-router-dom — routing between Overview / Forecast / About
- react-hook-form + zod — city search form validation
- axios — API calls
- leaflet — map

## Structure

- `api/` — axios instance + forecast API calls
- `components/` — layout (sidebar/topbar), search form, locate button, day tabs, cards
- `pages/` — Overview, Forecast, About, NotFound
- `hooks/useGeolocation.js` — wraps `navigator.geolocation`
- `utils/groupByDay.js` — buckets the flat slot list into days
- `schemas/citySchema.js` — zod validation for the search field