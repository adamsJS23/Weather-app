import LocationListView from "./src/js/view/locationListView.js";
import LocationView from "./src/js/view/locationView.js";
import HomeView from "./src/js/view/homeView.js";
import HourlyForecastView from "./src/js/view/hourlyForecastView.js";
import DailyForescastView from "./src/js/view/dailyForecastView.js";
import TomorrowView from "./src/js/view/tomorrowView.js";
import MapView from "./src/js/view/mapView.js";
import * as model from "./model.js"; // Import every thing from the model
import locationView from "./src/js/view/locationView.js";

function controlStoredLocation() {
  HomeView.render(model.state.storedLocation);
}

async function controlLocation() {
  try {
    // Get user query
    const query = LocationListView.getQuery();
    await model.findLocation(query, false);
    // Render Location information
    LocationListView.render(model.state.searchedLocation);
  } catch (err) {
    console.error(err);
  }
}

async function controlDisplayLocation(data) {
  try {
    await model.displayLocation(data);
    LocationView.render(model.state.locationCompleteDate);
    HourlyForecastView.render(model.state.locationCompleteDate);
    // LocationMapView.render feature
    MapView.render();
  } catch (err) {
    console.error(err);
  }
}

function controlMenu(targetMenu) {
  console.log(targetMenu);
  if (targetMenu === "today") {
    LocationView.clear();
    HourlyForecastView.render(model.state.locationCompleteDate);
    MapView.render();
  }
  if (targetMenu === "tomorrow") {
    locationView.clear();
    TomorrowView.render(model.state.locationCompleteDate.tomorrow);
  }

  if (targetMenu === "next_7_day") {
    locationView.clear();
    DailyForescastView.render(model.state.locationCompleteDate);
  }
}

function controlHome() {
  HomeView.render(model.state.storedLocation);
}

init();
function init() {
  LocationListView.addHandlerAdd(controlLocation);
  LocationListView.addHandlerEnter(controlLocation);
  LocationView.addHandlerClick(controlDisplayLocation);
  locationView.addHandlerMenuClick(controlMenu);
  LocationView.addHandlerHome(controlHome);
  controlStoredLocation();
}
