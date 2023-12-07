'use strict';

import { getWeatherToday } from './weather-today.js';
import { getWeatherForecast } from './weather-forecast.js';

// Returns true if weather elements exist in localStorage.
function WeatherItemsExist() {
  if (
    localStorage.getItem('todayData') &&
    localStorage.getItem('forecastData')
  ) {
    return true;
  } else {
    return false;
  }
}

// Returns weather elements.
function getWeatherItems() {
  const weatherDataStrings = [
    localStorage.getItem('todayData'),
    localStorage.getItem('forecastData'),
  ];

  const weatherDataObjects = weatherDataStrings.map((data) => {
    return JSON.parse(data);
  });

  return weatherDataObjects;
}

// Creates the weather elements in localStorage.
async function createWeatherItems() {
  // fetch data for default searchTerm
  const [todayData, forecastData] = await Promise.all([
    getWeatherToday(),
    getWeatherForecast(),
  ]);

  localStorage.setItem('today', JSON.stringify(todayData));
  localStorage.setItem('forecast', JSON.stringify(forecastData));
}

// Returns weather data from localStorage
export async function getWeatherData() {
  if (WeatherItemsExist()) {
    return getWeatherItems();
  } else {
    await createWeatherItems();
    return getWeatherItems();
  }
}

// Saves weather data fetched with searchTerm in localStorage.
export async function setWeatherData(searchTerm) {
  // fetch data with searchTerm
  const [todayData, forecastData] = await Promise.all([
    getWeatherToday(searchTerm),
    getWeatherForecast(searchTerm),
  ]);

  localStorage.setItem('today', JSON.stringify(todayData));
  localStorage.setItem('forecast', JSON.stringify(forecastData));
}
