import {
  OPENWEATHER_KEY,
  MAP_BASE_URL,
} from "./constants";

export function getWeatherMapUrl(
  layer = "temp_new"
) {
  return `${MAP_BASE_URL}/${layer}/{z}/{x}/{y}.png?appid=${OPENWEATHER_KEY}`;
}