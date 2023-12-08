'use strict';

import * as weather from './weather.js';
import weatherConditions from '../weather-conditions.js';

const weatherData = weather.getWeatherData();
const localTime = document.querySelector('.today-container__local-time');
const locationName = document.querySelector('.today-container__location-name');
const lastUpdated = document.querySelector(
  '.today-container__last-updated-value'
);
const icon = document.querySelector('.today-container__icon');

function setTodayValues(weatherData, weatherConditions) {
  setInterval(() => {
    localTime.textContent = weather.createTimezoneTime(weatherData);
  }, 1000);
  locationName.textContent = weather.createLocation(weatherData);
  lastUpdated.textContent = weather.createLastUpdatedTime(weatherData);
  icon.src = weather.createConditionIconUrl(weatherData, weatherConditions);
}

setTodayValues(weatherData, weatherConditions);

console.log(weatherConditions);