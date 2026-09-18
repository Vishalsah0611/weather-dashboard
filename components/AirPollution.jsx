export default function AirPollution({ data }) {
  if (!data?.list?.length) {
    return null;
  }

  const pollution = data.list[0];
  const aqi = pollution.main.aqi;
  const components = pollution.components;

  const aqiText = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };

  return (
    <article className="air-card">
      <h3>Air Quality</h3>

      <div className="aqi">
        <span>AQI</span>
        <strong>{aqi}</strong>
      </div>

      <p className={`aqi-status aqi-pill-${aqi}`}>
        {aqiText[aqi] || "Unknown"}
      </p>

      <div className="pollution-grid">
        <div>
          <span>PM2.5</span>
          <strong>{components.pm2_5?.toFixed(1)}</strong>
        </div>

        <div>
          <span>PM10</span>
          <strong>{components.pm10?.toFixed(1)}</strong>
        </div>

        <div>
          <span>CO</span>
          <strong>{components.co?.toFixed(1)}</strong>
        </div>

        <div>
          <span>NO₂</span>
          <strong>{components.no2?.toFixed(1)}</strong>
        </div>

        <div>
          <span>O₃</span>
          <strong>{components.o3?.toFixed(1)}</strong>
        </div>

        <div>
          <span>SO₂</span>
          <strong>{components.so2?.toFixed(1)}</strong>
        </div>
      </div>
    </article>
  );
}