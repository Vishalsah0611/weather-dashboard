import { ICON_BASE_URL } from "./constants";

function toCityDate(unixSeconds, timezoneOffset = 0) {
  return new Date((unixSeconds + timezoneOffset) * 1000);
}

export function toDateKey(unixSeconds, timezoneOffset = 0) {
  return toCityDate(unixSeconds, timezoneOffset).toISOString().slice(0, 10);
}

export function toWeekday(unixSeconds, timezoneOffset = 0) {
  return toCityDate(unixSeconds, timezoneOffset).toLocaleDateString("en-IN", {
    weekday: "long",
    timeZone: "UTC",
  });
}

export function toDayLabel(unixSeconds, timezoneOffset = 0) {
  return toCityDate(unixSeconds, timezoneOffset).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function toClockTime(unixSeconds, timezoneOffset = 0) {
  return toCityDate(unixSeconds, timezoneOffset).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function toDegrees(value) {
  return `${Math.round(value)}°`;
}

export function iconUrl(code) {
  return `${ICON_BASE_URL}/${code}@2x.png`;
}

export function describeError(error, cityName = "") {
  const status = error?.response?.status;
  if (status === 404) return `Couldn't find "${cityName}". Check the spelling and try again.`;
  if (status === 401) return "The weather API key looks invalid or isn't active yet.";
  if (status === 429) return "Too many requests right now — wait a bit and retry.";
  if (error?.code === "ERR_NETWORK") return "Network issue — check your connection.";
  return "Something went wrong while fetching the forecast.";
}