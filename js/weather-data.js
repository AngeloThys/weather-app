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

// Returns the timezone of the data.
function getTimezone() {
  const data = getWeatherData();

  return data.location.tz_id;
}

// returns the local time of the timezone.
export function createTimezoneTime() {
  const timezone = getTimezone();
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

// Returns the location name.
function getLocationName() {
  const data = getWeatherData();

  return data.location.name;
}

// Returns the location country.
function getLocationCountry() {
  const data = getWeatherData();

  return data.location.country;
}

// Return location name + country formatted.
export function createLocation() {
  const name = getLocationName();
  const country = getLocationCountry();

  return `${name}, ${country}`;
}

function getLastUpdatedDate() {
  const data = getWeatherData();
  const lastUpdatedDate = new Date(data.current.last_updated);

  return lastUpdatedDate
}

export function createLastUpdatedTime() {
  const lastUpdatedDate = getLastUpdatedDate();

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