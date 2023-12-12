'use strict';

import * as weatherStorage from './weather-local-storage.js';
import * as weatherToday from './weather-today.js';
import * as weatherForecast from './weather-forecast.js'; //todo: implement forecast logic
import weatherConditions from './weather-conditions.js';

let weatherData = weatherStorage.getWeatherData();

const searchIcon = document.querySelector('.search__icon');
const search = document.querySelector('.search');
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

const forecastAvgTempIcons = document.querySelectorAll(
  '.forecast-day__avg-temp-icon'
);
const forecastMaxTempIcons = document.querySelectorAll(
  '.forecast-day__max-temp-icon'
);
const forecastMinTempIcons = document.querySelectorAll(
  '.forecast-day__min-temp-icon'
);
const forecastMaxWindIcons = document.querySelectorAll(
  '.forecast-day__max-wind-icon'
);

function setForecastDates(weatherData) {
  const forecastDates = weatherForecast.getDates(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`.forecast-day-${i + 1}__date`).textContent =
      forecastDates[i];
  }
}

function setForecastIcons(weatherData, weatherConditions) {
  const forecastIconCodes = weatherForecast.getIconCodes(
    weatherData,
    weatherConditions
  );

  for (let i = 0; i < 3; i++) {
    document.querySelector(
      `.forecast-day-${i + 1}__image`
    ).src = `./images/weatherAPI/weather/64x64/day/${forecastIconCodes[i]}.png`;
  }
}

function setForecastAvgTempsCelsius(weatherData) {
  const forecastAvgTempsCelsius =
    weatherForecast.getAvgTempsCelsius(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`.forecast-day-${i + 1}__avg-temp`).textContent =
      forecastAvgTempsCelsius[i];
    document
      .querySelector(`.forecast-day-${i + 1}__avg-temp`)
      .classList.remove('fahrenheit');
    document
      .querySelector(`.forecast-day-${i + 1}__avg-temp`)
      .classList.add('celsius');
  }
}

function setForecastAvgTempsFahrenheit(weatherData) {
  const forecastAvgTempsFahrenheit =
    weatherForecast.getAvgTempsFahrenheit(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`.forecast-day-${i + 1}__avg-temp`).textContent =
      forecastAvgTempsFahrenheit[i];
    document
      .querySelector(`.forecast-day-${i + 1}__avg-temp`)
      .classList.remove('celsius');
    document
      .querySelector(`.forecast-day-${i + 1}__avg-temp`)
      .classList.add('fahrenheit');
  }
}

function setForecastMaxTempsCelsius(weatherData) {
  const forecastMaxTempsCelsius =
    weatherForecast.getMaxTempsCelsius(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`.forecast-day-${i + 1}__max-temp`).textContent =
      forecastMaxTempsCelsius[i];
    document
      .querySelector(`.forecast-day-${i + 1}__max-temp`)
      .classList.remove('fahrenheit');
    document
      .querySelector(`.forecast-day-${i + 1}__max-temp`)
      .classList.add('celsius');
  }
}

function setForecastMaxTempsFahrenheit(weatherData) {
  const forecastMaxTempsFahrenheit =
    weatherForecast.getMaxTempsFahrenheit(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`.forecast-day-${i + 1}__max-temp`).textContent =
      forecastMaxTempsFahrenheit[i];
    document
      .querySelector(`.forecast-day-${i + 1}__max-temp`)
      .classList.remove('celsius');
    document
      .querySelector(`.forecast-day-${i + 1}__max-temp`)
      .classList.add('fahrenheit');
  }
}

function setForecastMinTempsCelsius(weatherData) {
  const forecastMinTempsCelsius =
    weatherForecast.getMinTempsCelsius(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`.forecast-day-${i + 1}__min-temp`).textContent =
      forecastMinTempsCelsius[i];
    document
      .querySelector(`.forecast-day-${i + 1}__min-temp`)
      .classList.remove('fahrenheit');
    document
      .querySelector(`.forecast-day-${i + 1}__min-temp`)
      .classList.add('celsius');
  }
}

function setForecastMinTempsFahrenheit(weatherData) {
  const forecastMinTempsFahrenheit =
    weatherForecast.getMinTempsFahrenheit(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`.forecast-day-${i + 1}__min-temp`).textContent =
      forecastMinTempsFahrenheit[i];
    document
      .querySelector(`.forecast-day-${i + 1}__min-temp`)
      .classList.remove('celsius');
    document
      .querySelector(`.forecast-day-${i + 1}__min-temp`)
      .classList.add('fahrenheit');
  }
}

function setForecastAvgHumidities(weatherData) {
  const forecastAvgHumidities = weatherForecast.getAvgHumidities(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`.forecast-day-${i + 1}__avg-humidity`).textContent =
      forecastAvgHumidities[i];
  }
}

function setForecastDailyChanceRain(weatherData) {
  const forecastDailyChanceRain =
    weatherForecast.getDailyChancesRain(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(
      `.forecast-day-${i + 1}__daily-chance-rain`
    ).textContent = forecastDailyChanceRain[i];
  }
}

function setForecastMaxwindKph(weatherData) {
  const forecastMaxwindKph = weatherForecast.getMaxwindsKph(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`.forecast-day-${i + 1}__max-wind`).textContent =
      forecastMaxwindKph[i];
    document
      .querySelector(`.forecast-day-${i + 1}__max-wind`)
      .classList.remove('imperial');
    document
      .querySelector(`.forecast-day-${i + 1}__max-wind`)
      .classList.add('metric');
  }
}

function setForecastMaxwindMph(weatherData) {
  const forecastMaxwindMph = weatherForecast.getMaxwindsMph(weatherData);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`.forecast-day-${i + 1}__max-wind`).textContent =
      forecastMaxwindMph[i];
    document
      .querySelector(`.forecast-day-${i + 1}__max-wind`)
      .classList.remove('metric');
    document
      .querySelector(`.forecast-day-${i + 1}__max-wind`)
      .classList.add('imperial');
  }
}

function setTodayValues(weatherData, weatherConditions) {
  setInterval(() => {
    localTime.textContent = weatherToday.createTimezoneTime(weatherData);
  }, 1000);
  locationName.textContent = weatherToday.createLocation(weatherData);
  lastUpdated.textContent = weatherToday.createLastUpdatedTime(weatherData);
  icon.src = weatherToday.createConditionIconUrl(
    weatherData,
    weatherConditions
  );
  setTodayUnitSystem(weatherData);
  desc.textContent = weatherToday.getDescription(
    weatherData,
    weatherConditions
  );
  setBeaufortIcon(weatherToday.getBeaufortValue(weatherData));
  setWindDirectionIcon(weatherToday.getWindDirection(weatherData));
  windDirectionValue.textContent = weatherToday.getWindDirection(weatherData);
  humidityValue.textContent = weatherToday.getHumidity(weatherData);
  cloudCoverageValue.textContent = weatherToday.getCloudCoverage(weatherData);
  uvValue.textContent = weatherToday.getUv(weatherData);
}

function setTodayUnitSystem(weatherData) {
  const isFahrenheit = document.querySelector('.temp-toggle__checkbox').checked;

  if (isFahrenheit) {
    setTodayImperial(weatherData);
  } else {
    setTodayMetric(weatherData);
  }
}

function setTodayImperial(weatherData) {
  temp.textContent = weatherToday.getTemperatureFahrenheit(weatherData);
  temp.className = 'today-container__temp-value fahrenheit';
  tempFeel.textContent =
    weatherToday.getTemperatureFeelingFahrenheit(weatherData);
  tempFeel.className = 'today-container__feels-like-value fahrenheit';
  tempIcon.className = 'today-container__temp-icon wi wi-fahrenheit';
  tempFeelIcon.className = 'today-container__feels-like-icon wi wi-fahrenheit';
  windValue.textContent = weatherToday.getWindMph(weatherData);
  windValue.className = 'today-container__wind-value imperial';
  precipValue.textContent = weatherToday.getPrecipIn(weatherData);
  precipValue.className = 'today-container__precip-value imperial';
}

function setTodayMetric(weatherData) {
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

function setForecastValues(weatherData, weatherConditions) {
  setForecastDates(weatherData);
  setForecastIcons(weatherData, weatherConditions);
  setForecastAvgHumidities(weatherData);
  setForecastDailyChanceRain(weatherData);
  setForecastUnitSystem(weatherData);
}

function setForecastUnitSystem(weatherData) {
  const isFahrenheit = document.querySelector('.temp-toggle__checkbox').checked;

  if (isFahrenheit) {
    setForecastImperial(weatherData);
  } else {
    setForecastMetric(weatherData);
  }
}

function setForecastImperial(weatherData) {
  setForecastAvgTempsFahrenheit(weatherData);
  setForecastMaxTempsFahrenheit(weatherData);
  setForecastMinTempsFahrenheit(weatherData);
  setForecastMaxwindMph(weatherData);
  for (let icon of forecastAvgTempIcons) {
    icon.className = 'forecast-day__avg-temp-icon wi wi-fahrenheit';
  }
  for (let icon of forecastMaxTempIcons) {
    icon.className = 'forecast-day__max-temp-icon wi wi-fahrenheit';
  }
  for (let icon of forecastMinTempIcons) {
    icon.className = 'forecast-day__min-temp-icon wi wi-fahrenheit';
  }
  for (let icon of forecastMaxWindIcons) {
    icon.textContent = 'Mph';
  }
}

function setForecastMetric(weatherData) {
  setForecastAvgTempsCelsius(weatherData);
  setForecastMaxTempsCelsius(weatherData);
  setForecastMinTempsCelsius(weatherData);
  setForecastMaxwindKph(weatherData);
  for (let icon of forecastAvgTempIcons) {
    icon.className = 'forecast-day__avg-temp-icon wi wi-celsius';
  }
  for (let icon of forecastMaxTempIcons) {
    icon.className = 'forecast-day__max-temp-icon wi wi-celsius';
  }
  for (let icon of forecastMinTempIcons) {
    icon.className = 'forecast-day__min-temp-icon wi wi-celsius';
  }
  for (let icon of forecastMaxWindIcons) {
    icon.textContent = 'Kph';
  }
}

setTodayValues(weatherData, weatherConditions);
setForecastValues(weatherData, weatherConditions);
unitSystemToggle.addEventListener('click', () => {
  setTodayUnitSystem(weatherData);
  setForecastUnitSystem(weatherData);
});
searchIcon.addEventListener('click', () => {
  const searchTerm = search.value;
  weatherStorage.setWeatherData(searchTerm).then(() => {
    weatherData = weatherStorage.getWeatherData();
    setTodayValues(weatherData, weatherConditions);
    setForecastValues(weatherData, weatherConditions);
  });
});
