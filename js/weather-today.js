'use strict';

const protocol = 'https';
const baseUrl = 'api.weatherapi.com/v1';
const method = 'current.json';
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
  aqi = 'yes'
) {
  return `${protocol}://${baseUrl}/${method}?key=${apiKey}&q=${searchTerm}&aqi=${aqi}`;
}

export async function getWeatherToday(searchTerm) {
  const resource = createResource(protocol, baseUrl, method, apiKey, searchTerm);
  const response = await fetch(resource, options);
  const todayData = await response.json();

  return todayData;
}
