'use strict';

import { getWeatherForecast } from './weather-forecast.js';
import beaufortScale from '../beaufort-scale.js';

// Returns true if weather element exist in localStorage.
function WeatherItemExists() {
  if (localStorage.getItem('forecast')) {
    return true;
  } else {
    return false;
  }
}

// Returns weather element.
function getWeatherItem() {
  const weatherDataString = localStorage.getItem('forecast');

  const weatherDataObject = JSON.parse(weatherDataString);

  return weatherDataObject;
}

// Creates the weather element in localStorage.
async function createWeatherItem() {
  // fetch data for default searchTerm
  const forecastData = await getWeatherForecast();

  localStorage.setItem('forecast', JSON.stringify(forecastData));
}

// Returns weather data from localStorage
export function getWeatherData() {
  if (WeatherItemExists()) {
    return getWeatherItem();
  } else {
    createWeatherItem().then(() => {
      return getWeatherItem();
    });
  }
}

// Saves weather data fetched with searchTerm in localStorage.
export async function setWeatherData(searchTerm) {
  // fetch data with searchTerm
  const forecastData = await getWeatherForecast(searchTerm);

  localStorage.setItem('forecast', JSON.stringify(forecastData));
}

// returns the local time of the timezone.
export function createTimezoneTime(weatherData) {
  const timezone = weatherData.location.tz_id;
  const date = new Date();
  const options = {
    hour12: false,
    timezone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const timezoneTime = Intl.DateTimeFormat('en-GB', options).format(date);

  return timezoneTime;
}

// Return location name + country formatted.
export function createLocation(weatherData) {
  const name = weatherData.location.name;
  const country = weatherData.location.country;

  return `${name}, ${country}`;
}

// Return last updated time formatted.
export function createLastUpdatedTime(weatherData) {
  const lastUpdatedDate = new Date(weatherData.current.last_updated);

  let lastUpdatedHours = lastUpdatedDate.getHours();
  if (lastUpdatedHours < 10) {
    lastUpdatedHours.toString();
    lastUpdatedHours = '0' + lastUpdatedHours;
  } else {
    lastUpdatedHours.toString();
  }

  let lastUpdatedMinutes = lastUpdatedDate.getMinutes();
  if (lastUpdatedMinutes < 10) {
    lastUpdatedMinutes.toString();
    lastUpdatedMinutes = '0' + lastUpdatedMinutes;
  } else {
    lastUpdatedMinutes.toString();
  }

  const lastUpdatedTime = `${lastUpdatedHours}:${lastUpdatedMinutes}`;

  return lastUpdatedTime;
}

// Return condition icon url
export function createConditionIconUrl(weatherData, weatherConditions) {
  const conditionCode = weatherData.current.condition.code;
  const conditionObject = weatherConditions.find((object) => {
    return object.code === conditionCode;
  });
  const conditionIcon = conditionObject.icon;

  const isDay = weatherData.current.is_day;

  if (isDay === 1) {
    return `../images/weatherAPI/weather/64x64/day/${conditionIcon}.png`;
  } else {
    return `../images/weatherAPI/weather/64x64/night/${conditionIcon}.png`;
  }
}

// Returns temperature in Celsius.
export function getTemperatureCelsius(weatherData) {
  return weatherData.current.temp_c;
}

// Returns temperature in Fahrenheit.
export function getTemperatureFahrenheit(weatherData) {
  return weatherData.current.temp_f;
}

// Returns temperature feeling in Celsius.
export function getTemperatureFeelingCelsius(weatherData) {
  return weatherData.current.feelslike_c;
}

// Returns temperature feeling in Fahrenheit.
export function getTemperatureFeelingFahrenheit(weatherData) {
  return weatherData.current.feelslike_f;
}

// Returns weather description.
export function getDescription(weatherData, weatherConditions) {
  const conditionCode = weatherData.current.condition.code;
  const conditionObject = weatherConditions.find((object) => {
    return object.code === conditionCode;
  });

  const isDay = weatherData.current.is_day;

  if (isDay === 1) {
    return conditionObject.day;
  } else {
    return conditionObject.night;
  }
}

// Returns wind speed in kph
export function getWindKph(weatherData) {
  return weatherData.current.wind_kph;
}

// Returns wind speed in mph
export function getWindMph(weatherData) {
  return weatherData.current.wind_mph;
}

// Returns beaufort scale value
export function getBeaufortValue(weatherData) {
  const windSpeedKph = weatherData.current.wind_kph;

  const beaufortObject = beaufortScale.find((beaufortObject) => {
    return (
      windSpeedKph > beaufortObject.windSpeedMin &&
      windSpeedKph <= beaufortObject.windSpeedMax
    );
  });

  return beaufortObject.beaufort;
}

// Returns wind direction
export function getWindDirection(weatherData) {
  return weatherData.current.wind_dir;
}

// Returns amount of rain in mm
export function getPrecipMm(weatherData) {
  return weatherData.current.precip_mm;
}

// Returns amount of rain in in
export function getPrecipIn(weatherData) {
  return weatherData.current.precip_in;
}

// Returns humidity
export function getHumidity(weatherData) {
  return weatherData.current.humidity;
}

// Returns cloud coverage
export function getCloudCoverage(weatherData) {
  return weatherData.current.cloud;
}

// Returns uv
export function getUv(weatherData) {
  return weatherData.current.uv;
}