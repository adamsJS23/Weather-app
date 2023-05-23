import { API_KEY, URL_ONE_CALL } from "./config.js";
import { fetchData } from "./helper.js";
import { URL_GEOCODE } from "./config.js";

export const state = {
  location: {},
  searchedLocation: {},
  storedLocation: [],
  locationCompleteData: {},
  forecastOnScroll: 6,
};

export async function fetchLocationCoordinate(query) {
  try {
    const geocodeData = await fetchData(
      `${URL_GEOCODE}direct?q=${query}&appid=${API_KEY}`
    );
    if (!geocodeData.length) throw new Error("invalid location");
    const {
      lat,
      lon,
      country: countryCode,
      name: locationName,
    } = geocodeData[0];
    state.searchedLocation = { lat, lon, countryCode, locationName };
  } catch (err) {
    throw err;
  }
}

export async function fectchLocationData(dataObject) {
  try {
    const { countryCode } = dataObject;
    const countryData = await fetchData(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    state.searchedLocation.countryName = countryData[0].name.common;
  } catch (err) {
    throw "Country not found";
  }
}

export async function fetchLocationWeatherData(dataObject) {
  const { lat, lon } = dataObject;

  const weatherData = await fetchData(
    `${URL_ONE_CALL}onecall?lat=${lat}&lon=${lon}&lang=${navigator.language
      .toString()
      .slice(-2)
      .toLowerCase()}&units=metric&appid=${API_KEY}`
  );
  state.searchedLocation.weatherData = weatherData;
}

export async function fetchLocationAirQuality(dataObject) {
  try {
    const { lat, lon } = dataObject;
    const aqiData = await fetchData(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const { aqi } = aqiData.list[0].main; // aqi stand for Air Quality Index
    const aqiObject = getAirQaulityIndex(aqi);
    state.searchedLocation.aqi = aqiObject;

    formatSearchedLocation(state.searchedLocation);
  } catch (err) {
    console.error(err);
    throw "Can not find air quality data";
  }
}

function getHourlyForecast(dataArray) {
  return dataArray.map((hourForecast) => {
    const hour = new Intl.DateTimeFormat("en-GB", { hour: "2-digit" }).format(
      hourForecast.dt * 1000
    );
    const temp = Math.round(hourForecast.temp);
    const { icon } = hourForecast.weather[0];
    return { hour, temp, icon };
  });
}

function getDailyForecast(dataArray) {
  return dataArray.map((dayForecast, i) => {
    let dayLong;
    const unixTimestamp = dayForecast.dt * 1000;
    // const dayNumeric = new Date(unixTimestamp).getDate();
    const dayNumeric = new Intl.DateTimeFormat(navigator.language, {
      day: "2-digit",
    }).format(unixTimestamp);
    if (i === 0 || i === 1) {
      dayLong = new Intl.RelativeTimeFormat(navigator.language, {
        numeric: "auto",
      }).format(i, "day");
    } else {
      dayLong = new Intl.DateTimeFormat(navigator.language, {
        weekday: "long",
      }).format(unixTimestamp);
    }

    const min = Math.round(dayForecast.temp.min);
    const max = Math.round(dayForecast.temp.max);
    const icon = dayForecast.weather[0].icon;
    return { min, max, dayLong, dayNumeric, icon };
  });
}

function tomorrowForecast(tomorrowWeather) {
  const { clouds, humidity, uvi, wind_speed, feels_like, temp, weather, dt } =
    tomorrowWeather;
  const { day: feelsLike } = feels_like;
  const { description: weatherDescription, icon } = weather[0];
  const { day: dayTemp } = temp;
  return {
    clouds,
    humidity,
    uvi: Math.round(uvi),
    windSpeed: Math.round(wind_speed),
    feelsLike: Math.round(feelsLike),
    date: extractDate(dt),
    weatherDescription,
    icon,
    temp: Math.round(dayTemp),
  };
}

function formatSearchedLocation(data) {
  const { weatherData } = data;
  state.location = {
    locationName: data.locationName,
    countryName: data.countryName,
    locationLat: data.lat,
    locationLon: data.lon,
    temp: Math.round(weatherData.current.temp),
    date: extractDate(weatherData.current.dt),
    weatherDescription: weatherData.current.weather[0].description,
    icon: weatherData.current.weather[0].icon,
    time: Date.now(),
  };
}

export async function displayLocation(obj) {
  try {
    const {
      locationLat: lat,
      locationLon: lon,
      locationName,
      countryName,
    } = obj;

    const forecastHourly = getHourlyForecast(
      state.searchedLocation.weatherData.hourly
    );

    const forecastDaily = getDailyForecast(
      state.searchedLocation.weatherData.daily
    );
    const { weatherData, aqi } = state.searchedLocation;

    state.locationCompleteData = {
      locationName: locationName,
      countryName: countryName,
      temp: Math.round(weatherData.current.temp),
      visibility: formatKmperHour(weatherData.current.visibility),
      uvi: Math.round(weatherData.current.uvi),
      humidity: formatPercentage(weatherData.current.humidity),
      feelsLike: Math.round(weatherData.current.feels_like),
      pressure: Math.round(weatherData.current.pressure / 100),
      windSpeed: formatKmperHour(
        Math.round(weatherData.current.wind_speed),
        true
      ),
      clouds: formatPercentage(weatherData.current.clouds),
      date: extractDate(weatherData.current.dt),
      weatherDescription: weatherData.current.weather[0].description,
      icon: weatherData.current.weather[0].icon,
      hourly: forecastHourly,
      daily: forecastDaily,
      tomorrow: tomorrowForecast(weatherData.daily[1]),
      aqi: aqi.value,
    };
    console.log(state.locationCompleteData);
    return state.locationCompleteData;
  } catch (err) {
    throw err;
  }
}

function formatPercentage(value) {
  return new Intl.NumberFormat(navigator.language, {
    style: "unit",
    unit: "percent",
  }).format(value);
}

function formatTempertaure(value) {
  return new Intl.NumberFormat(navigator.language, {
    style: "unit",
    unit: "celsius",
  }).format(value);
}

function formatKmperHour(value, okFormat = false) {
  return new Intl.NumberFormat(navigator.language, {
    style: "unit",
    unit: "kilometer-per-hour",
    unitDisplay: "short",
    roundingMode: "floor",
  }).format(okFormat ? value : value / 1000);
}

// Extract date from the timestamp
function extractDate(unixTimestamp) {
  const milliseconds = unixTimestamp * 1000;
  const date = new Date(milliseconds);
  const options = { day: "2-digit", weekday: "short", month: "long" };
  const formatDate = new Intl.DateTimeFormat(
    navigator.language,
    options
  ).format(date);
  return formatDate;
}

// Store the current location to the browser local storage
function storeLocation(locations) {
  localStorage.setItem("locations", JSON.stringify(locations));
}

// Load stored location from the local storage
function loadStoredLocation() {
  const locations = JSON.parse(localStorage.getItem("locations"));
  state.storedLocation = locations ? locations : [];
  if (!state.storedLocation) throw new Error("There not favorite location");
}
//  Load local storage and store data in the state
loadStoredLocation();

// Implement Hourly forcast scrolling
const numberPage = 6;
export function partialHourlyForecast(scrollTo = 0) {
  const start = scrollTo * numberPage;
  const end = scrollTo * numberPage + numberPage;
  return state.locationCompleteData.hourly.slice(start, end);
}
// End hourly forcecast scroll

export function orderStoredLocations(storedlocation) {
  if (!storedlocation.length) return [];
  return storedlocation.sort((a, b) => b.time - a.time);
}

function getAirQaulityIndex(value) {
  // Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
  const aqi = [
    { key: 1, value: "Good" },
    { key: 2, value: "Fair" },
    { key: 3, value: "Moderate" },
    { key: 4, value: "poor" },
    { key: 5, value: "Very poor" },
  ];
  return aqi.find((obj) => obj.key === value);
}

// localStorage.removeItem('locations');

export function savedLocation() {
  
  state.storedLocation.push({
    locationLat: state.location.locationLat,
    locationLon: state.location.locationLon,
    countryName: state.location.countryName,
    locationName: state.location.locationName,
  });
  // Store the new location in local storage
  storeLocation(state.storedLocation);
  // Update storedLocation in State
  loadStoredLocation();
}
