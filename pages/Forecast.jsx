import { useState, useEffect } from "react";
import {
  CitySearchForm,
  LocateMeButton,
  DayTabs,
} from "../components/ForecastControls";
import SlotGrid from "../components/SlotGrid";
import StatusBanner from "../components/StatusBanner";
import AirPollution from "../components/AirPollution";
import WeatherMap from "../components/WeatherMap";

import {
  fetchCoordinatesByCity,
  fetchForecastByCoords,
  fetchCurrentByCoords,
  fetchAirPollution,
} from "../api/forecastService";

import { groupSlotsByDay } from "../utils/groupByDay";
import {
  describeError,
  toClockTime,
  toDegrees,
  iconUrl,
} from "../utils/formatters";

import { useGeolocation } from "../hooks/useGeolocation";

export default function Forecast() {
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);
  const [days, setDays] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [timezoneOffset, setTimezoneOffset] = useState(0);
  const [now, setNow] = useState(null);
  const [airData, setAirData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { locate, locating, locateError } = useGeolocation();

  async function loadWeatherFor(latitude, longitude) {
    setLoading(true);
    setErrorMessage("");

    try {
      const forecastResult = await fetchForecastByCoords(latitude, longitude);
      const currentResult = await fetchCurrentByCoords(latitude, longitude);

      let airResult = null;
      try {
        airResult = await fetchAirPollution(latitude, longitude);
      } catch (airError) {
        airResult = null;
      }

      const currentTime = Date.now();
      const futureSlots = forecastResult.slots.filter(
        (slot) => slot.dt * 1000 >= currentTime
      );

      const grouped = groupSlotsByDay(futureSlots, forecastResult.timezoneOffset);

      setLocation(forecastResult.location);
      setCoords({ latitude, longitude });
      setDays(grouped);
      setActiveKey(null);
      setTimezoneOffset(forecastResult.timezoneOffset);
      setNow(currentResult);
      setAirData(airResult);
    } catch (err) {
      setLocation(null);
      setCoords(null);
      setDays([]);
      setNow(null);
      setAirData(null);
      setErrorMessage(describeError(err));
    } finally {
      setLoading(false);
    }
  }

  async function runSearch(cityName) {
    setLoading(true);
    setErrorMessage("");

    try {
      const place = await fetchCoordinatesByCity(cityName);
      await loadWeatherFor(place.lat, place.lon);
    } catch (err) {
      setLocation(null);
      setCoords(null);
      setDays([]);
      setNow(null);
      setAirData(null);
      setErrorMessage(describeError(err, cityName));
      setLoading(false);
    }
  }

  async function runLocate() {
    setErrorMessage("");

    try {
      const { latitude, longitude } = await locate();
      await loadWeatherFor(latitude, longitude);
    } catch (err) {
      if (err?.response) {
        setErrorMessage(describeError(err));
      }
    }
  }

  useEffect(() => {
    runLocate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function jumpToDay(dayKey) {
    // Same day dobara click kiya to wapas sab din dikh jayenge
    setActiveKey((prevKey) => (prevKey === dayKey ? null : dayKey));
  }

  return (
    <section className="forecast-page">
      <div className="forecast-controls">
        <CitySearchForm onSubmitCity={runSearch} busy={loading} />
        <LocateMeButton onLocate={runLocate} locating={locating} />
      </div>

      {locateError && <StatusBanner kind="error">{locateError}</StatusBanner>}
      {errorMessage && <StatusBanner kind="error">{errorMessage}</StatusBanner>}

      {(loading || locating) && (
        <StatusBanner kind="info">
          {locating ? "Getting your location…" : "Fetching the forecast…"}
        </StatusBanner>
      )}

      {!loading && location && (
        <h2 className="forecast-place">
          {location.name}, {location.country}
          <span className="slot-count">
            {" "}
            — {days.reduce((n, d) => n + d.slots.length, 0)} slots over{" "}
            {days.length} days
          </span>
        </h2>
      )}

      {!loading && now && (
        <article className="now-card">
          <div>
            <p className="now-card-label">
              Right now · {toClockTime(now.dt, now.timezone)}
            </p>
            <p className="now-card-temp">{toDegrees(now.main.temp)}</p>
            <p className="now-card-desc">{now.weather[0].description}</p>
          </div>

          <img
            src={iconUrl(now.weather[0].icon)}
            alt={now.weather[0].description}
            width="72"
            height="72"
          />

          <ul className="now-card-stats">
            <li>
              <span>Feels</span>
              <span>{toDegrees(now.main.feels_like)}</span>
            </li>
            <li>
              <span>Humidity</span>
              <span>{now.main.humidity}%</span>
            </li>
            <li>
              <span>Wind</span>
              <span>{now.wind.speed} m/s</span>
            </li>
          </ul>
        </article>
      )}

      {!loading && (airData || coords) && (
        <div className="air-map-row">
          {airData && <AirPollution data={airData} />}
          {coords && (
            <WeatherMap latitude={coords.latitude} longitude={coords.longitude} />
          )}
        </div>
      )}

      {!loading && days.length > 0 && (
        <>
          <DayTabs days={days} activeKey={activeKey} onSelect={jumpToDay} />

          {(activeKey ? days.filter((day) => day.key === activeKey) : days)
            .map((day) => (
              <div key={day.key} className="day-section">
                <h3 className="day-section-heading">
                  {day.weekday}, {day.dayLabel}
                </h3>
                <SlotGrid slots={day.slots} timezoneOffset={timezoneOffset} />
              </div>
            ))}
        </>
      )}

      {!loading &&
        !locating &&
        !errorMessage &&
        !locateError &&
        days.length === 0 && (
          <StatusBanner kind="empty">
            Search a city or use your location to see its 5-day forecast.
          </StatusBanner>
        )}
    </section>
  );
}