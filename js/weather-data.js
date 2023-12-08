'use strict';

import { getWeatherForecast } from './weather-forecast.js';

// Returns true if weather element exist in localStorage.
function WeatherItemExists() {
  if (localStorage.getItem('forecastData')) {
    return true;
  } else {
    return false;
  }
}

// Returns weather element.
function getWeatherItem() {
  const weatherDataString = localStorage.getItem('forecastData');

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
export async function getWeatherData() {
  if (WeatherItemExists()) {
    return getWeatherItem();
  } else {
    await createWeatherItem();
    return getWeatherItem();
  }
}

// Saves weather data fetched with searchTerm in localStorage.
export async function setWeatherData(searchTerm) {
  // fetch data with searchTerm
  const forecastData = await getWeatherForecast(searchTerm);

  localStorage.setItem('forecast', JSON.stringify(forecastData));
}
