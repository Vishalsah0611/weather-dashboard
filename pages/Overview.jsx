import { Link } from "react-router-dom";

export default function Overview() {
  return (
    <section className="hero">
      <span className="hero-badge">☀️ Live 5-day forecast</span>
      <h1>Plan around the sky, one day at a time.</h1>
      <p>
        Search any city — or share your location — and see the next 5 days broken into
        3-hour slots: temperature, humidity, wind and conditions for each one.
      </p>
      <Link className="btn-primary" to="/forecast">
        Open the forecast
      </Link>

      <div className="hero-highlights">
        <div className="hero-highlight">
          <p className="hero-highlight-title">📍 Any location</p>
          <p className="hero-highlight-text">
            Type a city name or let your browser share your current location.
          </p>
        </div>
        <div className="hero-highlight">
          <p className="hero-highlight-title">🕒 3-hour detail</p>
          <p className="hero-highlight-text">
            40 timestamped slots across 5 days, not just a daily average.
          </p>
        </div>
        <div className="hero-highlight">
          <p className="hero-highlight-title">💨 Full conditions</p>
          <p className="hero-highlight-text">
            Feels-like temperature, humidity and wind speed on every card.
          </p>
        </div>
      </div>
    </section>
  );
}
