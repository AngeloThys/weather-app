'use strict';

import getWeatherAPIData from './weather-api-call.js';

// Returns true if weather element exist in localStorage.
function weatherItemExists() {
  if (localStorage.getItem('weather')) {
    return true;
  } else {
    return false;
  }
}

function getLastUpdatedDateString() {
  const weatherItem = getWeatherItem();
  const lastUpdatedDate = weatherItem.location.localtime;

  return lastUpdatedDate;
}

function getTimezone() {
  const weatherItem = getWeatherItem();
  const timezone = weatherItem.location.tz_id;

  return timezone;
}

function parseDateString(dateString, timezone) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timezone: timezone,
    timeZoneName: 'short',
  };
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDateString = dateFormatter.format(new Date(dateString));
  return new Date(formattedDateString);
}

// Returns true if weather element is older than 15 minutes.
function weatherItemOld() {
  const timezone = getTimezone();
  const lastUpdatedDateString = getLastUpdatedDateString();
  const lastUpdatedDate = parseDateString(lastUpdatedDateString, timezone);
  const currentDate = parseDateString(new Date(), timezone);

  const timeDifference = currentDate - lastUpdatedDate;
  const minutesDifference = timeDifference / (1000 * 60);

  return minutesDifference > 15;
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
  if (weatherItemExists() && !weatherItemOld()) {
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
