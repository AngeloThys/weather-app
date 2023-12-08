'use strict';

import { getWeatherForecast } from './weather-forecast.js';

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
  const conditionObject =  weatherConditions.find((object) => {
    return object.code === conditionCode;
  })
  const conditionIcon = conditionObject.icon;
  
  const isDay = weatherData.current.is_day;

  if (isDay === 1) {
    return `../images/weatherAPI/weather/64x64/day/${conditionIcon}.png`;
  } else {
    return `../images/weatherAPI/weather/64x64/night/${conditionIcon}.png`;
  }
}
