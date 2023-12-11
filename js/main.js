'use strict';

import * as weatherStorage from './weather-local-storage.js';
import * as weatherToday from './weather-today.js';
import * as weatherForecast from './weather-forecast.js'; //todo: implement forecast logic
import weatherConditions from './weather-conditions.js';

const weatherData = weatherStorage.getWeatherData();
const unitSystemToggle = document.querySelector('.temp-toggle__checkbox');
const localTime = document.querySelector('.today-container__local-time');
const locationName = document.querySelector('.today-container__location-name');
const lastUpdated = document.querySelector(
  '.today-container__last-updated-value'
);
const icon = document.querySelector('.today-container__icon');
const temp = document.querySelector('.today-container__temp-value');
const tempFeel = document.querySelector('.today-container__feels-like-value');
const tempIcon = document.querySelector('.today-container__temp-icon');
const tempFeelIcon = document.querySelector(
  '.today-container__feels-like-icon'
);
const desc = document.querySelector('.today-container__desc');
const windIcon = document.querySelector('.today-container__wind-icon');
const windValue = document.querySelector('.today-container__wind-value');
const windDirectionIcon = document.querySelector(
  '.today-container__wind-dir-icon'
);
const windDirectionValue = document.querySelector(
  '.today-container__wind-dir-value'
);
const precipValue = document.querySelector('.today-container__precip-value');
const humidityValue = document.querySelector(
  '.today-container__humidity-value'
);
const cloudCoverageValue = document.querySelector(
  '.today-container__cloud-cov-value'
);
const uvValue = document.querySelector('.today-container__uv-value');

function setTodayValues(weatherData, weatherConditions) {
  setInterval(() => {
    localTime.textContent = weatherToday.createTimezoneTime(weatherData);
  }, 1000);
  locationName.textContent = weatherToday.createLocation(weatherData);
  lastUpdated.textContent = weatherToday.createLastUpdatedTime(weatherData);
  icon.src = weatherToday.createConditionIconUrl(weatherData, weatherConditions);
  setTodayUnitSystem();
  desc.textContent = weatherToday.getDescription(weatherData, weatherConditions);
  setBeaufortIcon(weatherToday.getBeaufortValue(weatherData));
  setWindDirectionIcon(weatherToday.getWindDirection(weatherData));
  windDirectionValue.textContent = weatherToday.getWindDirection(weatherData);
  humidityValue.textContent = weatherToday.getHumidity(weatherData);
  cloudCoverageValue.textContent = weatherToday.getCloudCoverage(weatherData);
  uvValue.textContent = weatherToday.getUv(weatherData);
}

function setTodayUnitSystem() {
  const isFahrenheit = document.querySelector('.temp-toggle__checkbox').checked;

  if (isFahrenheit) {
    setTodayImperial();
  } else {
    setTodayMetric();
  }
}

function setTodayImperial() {
  temp.textContent = weatherToday.getTemperatureFahrenheit(weatherData);
  temp.className = 'today-container__temp-value fahrenheit';
  tempFeel.textContent = weatherToday.getTemperatureFeelingFahrenheit(weatherData);
  tempFeel.className = 'today-container__feels-like-value fahrenheit';
  tempIcon.className = 'today-container__temp-icon wi wi-fahrenheit';
  tempFeelIcon.className = 'today-container__feels-like-icon wi wi-fahrenheit';
  windValue.textContent = weatherToday.getWindMph(weatherData);
  windValue.className = 'today-container__wind-value imperial';
  precipValue.textContent = weatherToday.getPrecipIn(weatherData);
  precipValue.className = 'today-container__precip-value imperial';
}

function setTodayMetric() {
  temp.textContent = weatherToday.getTemperatureCelsius(weatherData);
  temp.className = 'today-container__temp-value celsius';
  tempFeel.textContent = weatherToday.getTemperatureFeelingCelsius(weatherData);
  tempFeel.className = 'today-container__feels-like-value celsius';
  tempIcon.className = 'today-container__temp-icon wi wi-celsius';
  tempFeelIcon.className = 'today-container__feels-like-icon wi wi-celsius';
  windValue.textContent = weatherToday.getWindKph(weatherData);
  windValue.className = 'today-container__wind-value metric';
  precipValue.textContent = weatherToday.getPrecipMm(weatherData);
  precipValue.className = 'today-container__precip-value metric';
}

function setBeaufortIcon(beaufort) {
  const beaufortClass = `today-container__wind-icon wi wi-wind-beaufort-${beaufort}`;
  windIcon.className = beaufortClass;
}

function setWindDirectionIcon(windDirection) {
  const windDirectionClass = `today-container__wind-dir-icon wi wi-wind wi-towards-${windDirection.toLowerCase()}`;
  windDirectionIcon.className = windDirectionClass;
}

setTodayValues(weatherData, weatherConditions);
unitSystemToggle.addEventListener('click', setTodayUnitSystem);
