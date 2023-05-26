import LocationListView from "./src/js/view/locationListView.js";
import LocationView from "./src/js/view/locationView.js";
import HomeView from "./src/js/view/homeView.js";
import HourlyForecastView from "./src/js/view/hourlyForecastView.js";
import DailyForescastView from "./src/js/view/dailyForecastView.js";
import TomorrowView from "./src/js/view/tomorrowView.js";
import MapView from "./src/js/view/mapView.js";
import * as model from "./model.js"; // Import every thing from the model
import locationView from "./src/js/view/locationView.js";
import locationListView from "./src/js/view/locationListView.js";
import { TIME_CLEAR_ERROR } from "./config.js";

async function controlStoredLocation() {
  try {
    if (!model.state.storedLocation.length) {
      showMessage();
      return;
    }
    // HomeView.clear();
    locationListView.renderSpinner()
    await model.fetchStoredLocationWeatherData(model.state.storedLocation);
    locationListView.removeSpinner()
    console.log(model.state.storedLocationWeatherData)
    HomeView.render(model.state.storedLocationWeatherData);
    

  } catch (err) {
    console.error(err);
  }
  // if (!model.state.storedLocation.length) {
  //   showMessage();
  //   return;
  // }
  // model.state.storedLocation.forEach(async function (location) {
  //   try {
  //     const { locationLat: lat, locationLon: lon } = location;
  //     locationListView.renderSpinner();
  //     // await countryName, locationName from countryCode
  //     await model.fetchLocationWeatherData({ lat, lon });
  //     // await air quanlity data
  //     await model.fetchLocationAirQuality({ lat, lon });
  //     // Render location
  //     locationListView.removeSpinner()
  //     // LocationListView.render(model.state.location);
  //     console.log(model.state.searchedLocation);
  //   } catch (err) {
  //     showErrorMessage(err);
  //   }finally
  //   {
  //     locationListView.removeSpinner()
  //   }
  // });
  // locationListView.removeSpinner()
}

/*****************Event:Page Load********************/
// 1.Check if there is a stored location
//     a. There is a stored location we display it
//     b. There is no stored location to display

/************Event:User click on + to add a new Location**************/
//    a. If query is empty, render error 'empty query'
//    b. If invalid location, render error 'Invalid query'

// 1.fecth lat & lon location
// 2.fecth location weather data
// 3.fectch Location air quality data
// 4.Render the new Location we essential information like, Country Name, Location name, temperature, the current weather icon

/*****Event:User click on a location*************/
// 1. Hide +(Add) button and Show Home button
// 1. Render the location with of the information like uvi, clouds, pressure, wind speed, hourly forecsat, air quality and also more information about air quality.

/*******Event:User click on Tomorrow link*******/
// 1. Render the weather information like temperature, clouds, pressure, wind speed, uvi

/*****Event:User click on Nex 7 Day link**** ***/
// 1. Render the forecast for the next 7 day and for each day we render the date, the min and the max temperature and also the weather icon

/*****Event:User Click on Home button*** *******/
// 1. Hide Home button and show Add button
// 2. Render stored location

async function ctrlFetchLocationCoordinate() {
  try {
    // Get user query
    const query = LocationListView.getQuery();
    if (!query) {
      throw "Empty query";
    }
    // debugger
    locationListView.renderSpinner();
    // await the lat, lon, countryCode from query
    await model.fetchLocationCoordinate(query, false);
    // await countryName, locationName from countryCode
    await model.fectchLocationData(model.state.searchedLocation);
    // await location weather data from lat lon
    await model.fetchLocationWeatherData(model.state.searchedLocation);
    // await air quanlity data
    await model.fetchLocationAirQuality(model.state.searchedLocation);
    locationListView.removeSpinner();
    // Render location
    LocationListView.render(model.state.location);
    // Bookmarked location
    model.savedLocation();

    console.log(model.state.searchedLocation);
    console.log(model.state.location);
  } catch (err) {
    showErrorMessage(err);
  }
}

async function controlDisplayLocation(data) {
  try {
    locationListView.renderSpinner();
    await model.gatherWeatherData(data);
    locationListView.removeSpinner();
    console.log(model.state.locationWeatherData);
    LocationView.render(model.state.locationWeatherData);
    // debugger;
    HourlyForecastView.render(model.partialHourlyForecast(0), 0);

    // LocationMapView.render feature
    MapView.render();
  } catch (err) {
    showErrorMessage(err);
  }
}

function controlMenu(targetMenu) {
  if (targetMenu === "today") {
    // Same code
    LocationView.clear();
    HourlyForecastView.render(model.partialHourlyForecast(0), 0);
    MapView.render();
  }
  if (targetMenu === "tomorrow") {
    locationView.clear();
    TomorrowView.render(model.state.locationWeatherData.tomorrow);
  }

  if (targetMenu === "next_7_day") {
    locationView.clear();
    DailyForescastView.render(model.state.locationWeatherData);
  }
}

function controlPartialHourlyForecast(scrollTo) {
  // Same code
  LocationView.clear();
  // debugger;
  HourlyForecastView.render(model.partialHourlyForecast(scrollTo), scrollTo);
  MapView.render();
}

function showErrorMessage(err) {
  console.error(err);
  LocationListView.renderError(err);
  setTimeout(() => locationListView.removeErrorMessage(), TIME_CLEAR_ERROR);
}

function showMessage() {
  LocationListView.renderMessage();
  setTimeout(() => locationListView.removeMessage(), TIME_CLEAR_ERROR);
}

init();
function init() {
  LocationListView.addHandlerAdd(ctrlFetchLocationCoordinate);
  LocationListView.addHandlerEnter(ctrlFetchLocationCoordinate);
  LocationView.addHandlerClick(controlDisplayLocation);
  locationView.addHandlerMenuClick(controlMenu);
  LocationView.addHandlerHome(controlStoredLocation);
  HourlyForecastView.addHandlerArrowClicked(controlPartialHourlyForecast);
  controlStoredLocation();
}
