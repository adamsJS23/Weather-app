import { API_KEY, URL_ONE_CALL } from "./config.js";
import { fetchData } from "./helper.js";
import { URL_GEOCODE } from "./config.js";

export const state = {
  searchedLocation: {},
  storedLocation: [],
  locationCompleteDate: {},
  forecastOnScroll: 6,
};

export async function findLocation(query) {
  try {
    if (!query) {
      throw new Error('"Invalid location"');
    }
    // debugger
    const geocodeData = await fetchData(
      `${URL_GEOCODE}direct?q=${query}&appid=${API_KEY}`
    );
    const { lat, lon, country } = geocodeData[0];

    // const countryData = await fetchData(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=1&appid=${API_KEY}`
    // ); Doesn't retrun the expected result searching location like paris, ougadougou
    const countryData = await fetchData(
      `https://restcountries.com/v3.1/alpha/${country}`
    );

    const weatherData = await fetchData(
      `${URL_ONE_CALL}onecall?lat=${lat}&lon=${lon}&lang=${navigator.language
        .toString()
        .slice(-2)
        .toLowerCase()}&units=metric&appid=${API_KEY}`
    );

    // formatting data different api request
    formatSearchedLocation(weatherData, countryData, geocodeData);

    const { countryName, locationName, locationLat, locationLon } =
      state.searchedLocation;
    // debugger;
    state.storedLocation.push({
      countryName,
      locationName,
      locationLat: lat,
      locationLon: lon,
    });
    // Store the locations to the local storage
    storeLocation(state.storedLocation);
    // Update the location local storage
    loadStoredLocation();
  } catch (err) {
    throw err;
  }
}

function formatSearchedLocation(weatherData, countryData, geocodeData) {
  state.searchedLocation = {
    locationName: geocodeData[0].name,
    countryName: countryData[0].name.common,
    lat: geocodeData[0].lat,
    lon: geocodeData[0].lon,
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

    const weatherData = await fetchData(
      `${URL_ONE_CALL}onecall?lat=${lat}&lon=${lon}&lang=${navigator.language
        .toString()
        .slice(-2)
        .toLowerCase()}&units=metric&appid=${API_KEY}`
    );
    const forecastHourly = weatherData.hourly.map((hourForecast) => {
      const hour = `${new Date(hourForecast.dt * 1000).getHours()}:00`;
      const temp = Math.round(hourForecast.temp);
      const { icon } = hourForecast.weather[0];
      return { hour, temp, icon };
    });

    const forecastDaily = weatherData.daily.map((dayForecast) => {
      const unixTimestamp = dayForecast.dt * 1000;
      const dayNumeric = new Date(unixTimestamp).getDate();
      const dayLong = new Intl.DateTimeFormat(navigator.language, {
        weekday: "long",
      }).format(unixTimestamp);
      const min = new Intl.NumberFormat(navigator.language, {
        style: "unit",
        unit: "celsius",
      }).format(dayForecast.temp.min);
      const max = Math.round(dayForecast.temp.max);
      const icon = dayForecast.weather[0].icon;
      return { min, max, dayLong, dayNumeric, icon };
    });

    function tomorrowForecast(tomorrowWeather) {
      const {
        clouds,
        humidity,
        uvi,
        wind_speed,
        feels_like,
        temp,
        weather,
        dt,
      } = tomorrowWeather;
      const { day: feelsLike } = feels_like;
      const { description: weatherDescription, icon } = weather[0];
      const { day: dayTemp } = temp;
      return {
        clouds,
        humidity,
        uvi: Math.round(uvi),
        windSpeed: Math.round(wind_speed),
        feelsLike: formatTempertaure(Math.round(feelsLike)),
        date: extractDate(dt),
        weatherDescription,
        icon,
        temp: formatTempertaure(Math.round(dayTemp)),
      };
    }

    state.locationCompleteDate = {
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
    };
    console.log(state.locationCompleteDate.pressure);
    return state.locationCompleteDate;
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
  const options = { day: "numeric", month: "long" };
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
  // debugger
  if (scrollTo > 7) scrollTo = 0;
  if (scrollTo < 0) scrollTo = 7;
  const start = scrollTo * numberPage;
  const end = scrollTo * numberPage + numberPage;
  return state.locationCompleteDate.hourly.slice(start, end);
}
// End hourly forcecast scroll

export function orderStoredLocations(storedlocation) {
  if (!storedlocation.length) return [];
  return storedlocation.sort((a, b) => b.time - a.time);
}

async function getMap() {
  const map = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=31.2322758&lon=121.4692071&appid=${API_KEY}`
  );

  const data = await map.json();
  console.log(data);
}
getMap();

// localStorage.removeItem('locations');
