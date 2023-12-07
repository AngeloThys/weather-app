'use strict';

const protocol = 'https';
const baseUrl = 'api.weatherapi.com/v1';
const method = 'forecast.json';
const apiKey = '47e5ce1503c946f3a17144428230312';
const options = {
  mode: 'cors',
};

function createResource(
  protocol = 'https',
  baseUrl = 'api.weatherapi.com/v1',
  method,
  apiKey,
  searchTerm = 'Santa Cruz de Tenerife',
  days = '3',
  aqi = 'yes'
) {
  return `${protocol}://${baseUrl}/${method}?key=${apiKey}&q=${searchTerm}&days=${days}&aqi=${aqi}`;
}

export async function getWeatherForecast(searchTerm) {
  const resource = createResource(protocol, baseUrl, method, apiKey, searchTerm);
  const response = await fetch(resource, options);
  const forecastData = await response.json();

  return forecastData;
}
