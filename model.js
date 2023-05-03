import { API_KEY, URL_ONE_CALL } from "./config.js";
import { fetchData } from "./helper.js";
import { URL_GEOCODE } from "./config.js";

export async function findLocation(query) {
  if (!query) {
    console.log("Invalid location");
    return;
  }
  // debugger
  const geocodeData = await fetchData(
    `${URL_GEOCODE}direct?q=${query}&appid=${API_KEY}`
  );
  const { lat, lon } = geocodeData[0];
  
  const weatherData = await fetchData(
    `${URL_ONE_CALL}onecall?lat=${lat}&lon=${lon}&lang=${navigator.language
      .toString()
      .slice(-2)
      .toLowerCase()}&units=metric&appid=${API_KEY}`
  );

  console.log(weatherData);
}
