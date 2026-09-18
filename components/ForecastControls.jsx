import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { citySchema } from "../schemas/citySchema";
import { toDegrees } from "../utils/formatters";

export function CitySearchForm({ onSubmitCity, busy }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(citySchema),
    defaultValues: {
      cityName: "",
    },
  });

  function submit(values) {
    onSubmitCity(values.cityName);
  }

  return (
    <form
      className="city-form"
      onSubmit={handleSubmit(submit)}
      noValidate
    >
      <div className="city-form-field">
        <input
          type="text"
          placeholder="Try Chandigarh, Mumbai, London…"
          aria-label="City name"
          aria-invalid={Boolean(errors.cityName)}
          {...register("cityName")}
        />

        {errors.cityName && (
          <p className="field-error">
            {errors.cityName.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={busy}
      >
        {busy ? "Searching…" : "Get forecast"}
      </button>
    </form>
  );
}

export function LocateMeButton({ onLocate, locating }) {
  return (
    <button
      type="button"
      className="btn-ghost"
      onClick={onLocate}
      disabled={locating}
    >
      {locating ? "Locating…" : "📍 Use my location"}
    </button>
  );
}

export function DayTabs({ days, activeKey, onSelect }) {
  const highlightKey = activeKey ?? days[0]?.key;

  return (
    <div className="day-tabs" role="tablist">
      {days.map((day) => (
        <button
          key={day.key}
          role="tab"
          type="button"
          className={`day-tab ${
            day.key === highlightKey
              ? "day-tab-active"
              : ""
          }`}
          aria-selected={day.key === highlightKey}
          onClick={() => onSelect(day.key)}
        >
          <span className="day-tab-name">
            {day.weekday.slice(0, 3)}
          </span>

          <span className="day-tab-date">
            {day.dayLabel}
          </span>

          <span className="day-tab-range">
            {toDegrees(day.max)} / {toDegrees(day.min)}
          </span>
        </button>
      ))}
    </div>
  );
}