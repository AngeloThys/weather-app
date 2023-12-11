'use strict';

import getWeatherAPIData from './weather-api-call.js';

// Returns true if weather element exist in localStorage.
function WeatherItemExists() {
  if (localStorage.getItem('weather')) {
    return true;
  } else {
    return false;
  }
}

// Returns weather element.
function getWeatherItem() {
  const weatherDataString = localStorage.getItem('weather');

  const weatherDataObject = JSON.parse(weatherDataString);

  return weatherDataObject;
}

// Creates the weather element in localStorage.
async function createWeatherItem() {
  // fetch data for default searchTerm
  const weatherData = await getWeatherAPIData();

  localStorage.setItem('weather', JSON.stringify(weatherData));
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
  const weatherData = await getWeatherAPIData(searchTerm);

  localStorage.setItem('weather', JSON.stringify(weatherData));
}
