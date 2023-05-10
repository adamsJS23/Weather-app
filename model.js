import { API_KEY, URL_ONE_CALL } from "./config.js";
import { fetchData } from "./helper.js";
import { URL_GEOCODE } from "./config.js";

export const state = {
  currentLocation: {},
  storedLocation: [],
  locationCompleteDate: {},
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

    state.currentLocation = {
      locationName: geocodeData[0].name,
      countryName: countryData[0].name.common,
      locationLat: geocodeData[0].lat,
      locationLon: geocodeData[0].lon,
      temp: Math.round(weatherData.current.temp),
      date: extractDate(weatherData.current.dt),
      weatherDescription: weatherData.current.weather[0].description,
      icon: weatherData.current.weather[0].icon,
      time: Date.now(),
    };
    state.storedLocation.push(state.currentLocation);
    // Store the locations to the local storage
    storeLocation(state.storedLocation);
    // Update the location local storage
    loadStoredLocation();
  } catch (err) {
    throw err;
  }
}

export async function displayLocation(obj) {
  try {
    const { lat, lon, locationName, countryName } = obj;
    const weatherData = await fetchData(
      `${URL_ONE_CALL}onecall?lat=${lat}&lon=${lon}&lang=${navigator.language
        .toString()
        .slice(-2)
        .toLowerCase()}&units=metric&appid=${API_KEY}`
    );
    // console.log(weatherData);
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
      const min = Math.round(dayForecast.temp.min);
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
      const { description:weatherDescription, icon } = weather[0];
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
    console.log(tomorrowForecast(weatherData.daily[1]))
    // console.log(weatherData.daily[1]);

    state.locationCompleteDate = {
      locationName: locationName,
      countryName: countryName,
      temp: Math.round(weatherData.current.temp),
      visibility: weatherData.current.visibility,
      uvi: Math.round(weatherData.current.uvi),
      humidity: weatherData.current.humidity,
      feelsLike: Math.round(weatherData.current.feels_like),
      pressure: Number.parseInt(weatherData.current.pressure),
      windSpeed: Math.round(weatherData.current.wind_speed),
      clouds: weatherData.current.clouds,
      date: extractDate(weatherData.current.dt),
      weatherDescription: weatherData.current.weather[0].description,
      icon: weatherData.current.weather[0].icon,
      hourly: forecastHourly,
      daily: forecastDaily,
      tomorrow:tomorrowForecast(weatherData.daily[1])
    };
  } catch (err) {
    throw err;
  }
}

console.log(state.locationCompleteDate.daily);

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

export function orderStoredLocations(storedlocation) {
  if (!storedlocation.length) return [];
  return storedlocation.sort((a, b) => b.time - a.time);
}
// console.log(orderStoredLocations(state.storedLocation));

async function getMap() {
  const map = fetchData(
    `http://maps.openweathermap.org/maps/2.0/weather/TA2/1/2/2?date=1527811200&opacity=0.9&fill_bound=true&palette=0:FF0000;10:00FF00;20:0000FF&appid=${API_KEY}`
  );

  console.log(map);
}
// getMap();
