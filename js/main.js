'use strict';

import * as weatherData from './weather-data.js';
import { getWeatherForecast } from './weather-forecast.js';

const localTime = document.querySelector('.today-container__local-time');
setInterval(() => {
  localTime.textContent = weatherData.createTimezoneTime();
}, 1000);

const locationName = document.querySelector('.today-container__location-name');
locationName.textContent = weatherData.createLocation();

const lastUpdated = document.querySelector(
  '.today-container__last-updated-value'
);
lastUpdated.textContent = weatherData.createLastUpdatedTime();
