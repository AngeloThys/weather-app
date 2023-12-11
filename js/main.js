'use strict';

import * as weather from './weather.js';
import weatherConditions from '../weather-conditions.js';

const weatherData = weather.getWeatherData();
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
    localTime.textContent = weather.createTimezoneTime(weatherData);
  }, 1000);
  locationName.textContent = weather.createLocation(weatherData);
  lastUpdated.textContent = weather.createLastUpdatedTime(weatherData);
  icon.src = weather.createConditionIconUrl(weatherData, weatherConditions);
  setUnitSystem();
  desc.textContent = weather.getDescription(weatherData, weatherConditions);
  setBeaufortIcon(weather.getBeaufortValue(weatherData));
  setWindDirectionIcon(weather.getWindDirection(weatherData));
  windDirectionValue.textContent = weather.getWindDirection(weatherData);
  humidityValue.textContent = weather.getHumidity(weatherData);
  cloudCoverageValue.textContent = weather.getCloudCoverage(weatherData);
  uvValue.textContent = weather.getUv(weatherData);
}

function setUnitSystem() {
  const isFahrenheit = document.querySelector('.temp-toggle__checkbox').checked;

  if (isFahrenheit) {
    setImperial();
  } else {
    setMetric();
  }
}

function setImperial() {
  temp.textContent = weather.getTemperatureFahrenheit(weatherData);
  temp.className = 'today-container__temp-value fahrenheit';
  tempFeel.textContent = weather.getTemperatureFeelingFahrenheit(weatherData);
  tempFeel.className = 'today-container__feels-like-value fahrenheit';
  tempIcon.className = 'today-container__temp-icon wi wi-fahrenheit';
  tempFeelIcon.className = 'today-container__feels-like-icon wi wi-fahrenheit';
  windValue.textContent = weather.getWindMph(weatherData);
  windValue.className = 'today-container__wind-value imperial';
  precipValue.textContent = weather.getPrecipIn(weatherData);
  precipValue.className = 'today-container__precip-value imperial';
}

function setMetric() {
  temp.textContent = weather.getTemperatureCelsius(weatherData);
  temp.className = 'today-container__temp-value celsius';
  tempFeel.textContent = weather.getTemperatureFeelingCelsius(weatherData);
  tempFeel.className = 'today-container__feels-like-value celsius';
  tempIcon.className = 'today-container__temp-icon wi wi-celsius';
  tempFeelIcon.className = 'today-container__feels-like-icon wi wi-celsius';
  windValue.textContent = weather.getWindKph(weatherData);
  windValue.className = 'today-container__wind-value metric';
  precipValue.textContent = weather.getPrecipMm(weatherData);
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
unitSystemToggle.addEventListener('click', setUnitSystem);
