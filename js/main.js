'use strict';

import * as weatherData from './weather-data.js';
import { getWeatherForecast } from './weather-forecast.js';

const localTime = document.querySelector('.today-container__local-time');
setInterval(() => {
  localTime.textContent = weatherData.createTimezoneTime();
}, 1000);
