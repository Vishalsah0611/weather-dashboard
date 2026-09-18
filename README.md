# WeatherScope

A small React + Vite dashboard for OpenWeatherMap's **5 day / 3 hour forecast** API.
Search any city, or share your location, and browse the next five days one day at a
time (each day tab holds its own set of 3-hour slot cards — 40 slots total).

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

## Structure

- `api/` — axios instance + forecast API calls
- `components/` — layout (sidebar/topbar), search form, locate button, day tabs, cards
- `pages/` — Overview, Forecast, About, NotFound
- `hooks/useGeolocation.js` — wraps `navigator.geolocation`
- `utils/groupByDay.js` — buckets the flat 40-slot list into 5 days
- `schemas/citySchema.js` — zod validation for the search field
Weather dashboard project updated.