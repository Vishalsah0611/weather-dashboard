import { toClockTime, toDegrees, iconUrl } from "../utils/formatters";

export default function SlotCard({ slot, timezoneOffset }) {
  const condition = slot.weather[0];
  return (
    <article className="slot-card">
      <span className="slot-time">{toClockTime(slot.dt, timezoneOffset)}</span>
      <img src={iconUrl(condition.icon)} alt={condition.description} width="56" height="56" />
      <p className="slot-temp">{toDegrees(slot.main.temp)}</p>
      <p className="slot-desc">{condition.description}</p>
      <ul className="slot-stats">
        <li>
          <span>Feels</span>
          <span>{toDegrees(slot.main.feels_like)}</span>
        </li>
        <li>
          <span>Humidity</span>
          <span>{slot.main.humidity}%</span>
        </li>
        <li>
          <span>Wind</span>
          <span>{slot.wind.speed} m/s</span>
        </li>
      </ul>
    </article>
  );
}
