import axios from "axios";

import {
  OPENWEATHER_KEY,
  FORECAST_BASE_URL,
  UNITS,
} from "../utils/constants";

const httpClient = axios.create({
  baseURL: FORECAST_BASE_URL,
  timeout: 10000,
  params: {
    appid: OPENWEATHER_KEY,
    units: UNITS,
  },
});

export default httpClient;