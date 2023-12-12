'use strict';

function getForecastDays(weatherData) {
  return weatherData.forecast.forecastday;
}

export function getDates(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastDates = forecastDays.map((day) => {
    return day.date;
  });

  return forecastDates;
}

export function getAvgTempsCelsius(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastAvgTempsCelsius = forecastDays.map((day) => {
    return day.day.avgtemp_c;
  });

  return forecastAvgTempsCelsius;
}

export function getAvgTempsFahrenheit(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastAvgTempsFahrenheit = forecastDays.map((day) => {
    return day.day.avgtemp_f;
  });

  return forecastAvgTempsFahrenheit;
}

export function getMaxTempsCelsius(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastMaxTempsCelsius = forecastDays.map((day) => {
    return day.day.maxtemp_c;
  });

  return forecastMaxTempsCelsius;
}

export function getMaxTempsFahrenheit(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastMaxTempsFahrenheit = forecastDays.map((day) => {
    return day.day.maxtemp_f;
  });

  return forecastMaxTempsFahrenheit;
}

export function getMinTempsCelsius(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastMinTempsCelsius = forecastDays.map((day) => {
    return day.day.mintemp_c;
  });

  return forecastMinTempsCelsius;
}

export function getMinTempsFahrenheit(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastMinTempsFahrenheit = forecastDays.map((day) => {
    return day.day.mintemp_f;
  });

  return forecastMinTempsFahrenheit;
}

export function getIconCodes(weatherData, weatherConditions) {
  const forecastDays = getForecastDays(weatherData);
  const forecastConditionCodes = forecastDays.map((day) => {
    return day.day.condition.code;
  });
  const forecastIconCodes = [];

  forecastConditionCodes.forEach((conditionCode) => {
    weatherConditions.forEach((conditionObject) => {
      if (conditionObject.code === conditionCode) {
        forecastIconCodes.push(conditionObject.icon);
      }
    });
  });

  return forecastIconCodes;
}

export function getAvgHumidities(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastAvgHumidities = forecastDays.map((day) => {
    return day.day.avghumidity;
  });

  return forecastAvgHumidities;
}

export function getDailyChancesRain(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastDailyChancesRain = forecastDays.map((day) => {
    return day.day.daily_chance_of_rain;
  });

  return forecastDailyChancesRain;
}

export function getMaxwindsKph(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastMaxwindsKph = forecastDays.map((day) => {
    return day.day.maxwind_kph;
  });

  return forecastMaxwindsKph;
}

export function getMaxwindsMph(weatherData) {
  const forecastDays = getForecastDays(weatherData);
  const forecastMaxwindsMph = forecastDays.map((day) => {
    return day.day.maxwind_mph;
  });

  return forecastMaxwindsMph;
}
