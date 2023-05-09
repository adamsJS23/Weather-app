import LocationListView from "./src/js/view/locationListView.js";
import LocationView from "./src/js/view/locationView.js";
import HomeView from "./src/js/view/homeView.js";
import HourlyForecastView from "./src/js/view/hourlyForecastView.js";
import DailyForescastView from './src/js/view/dailyForecastView.js'
import * as model from "./model.js"; // Import every thing from the model

function controlStoredLocation() {
  HomeView.render(model.state.storedLocation);
}

async function controlLocation() {
  try {
    // Get user query
    const query = LocationListView.getQuery();
    await model.findLocation(query, false);
    // Render Location information
    LocationListView.render(model.state.currentLocation);
    
  } catch (err) {
    console.error(err);
  }
}

async function controlDisplayLocation(data) {
  try {
    await model.displayLocation(data);
    console.log(model.state.locationCompleteDate)
    LocationView.render(model.state.locationCompleteDate);
    // debugger
    HourlyForecastView.render(model.state.locationCompleteDate);
    // LocationMapView.render feature

    //Render next7dayView
    DailyForescastView.render(model.state.locationCompleteDate)
  } catch (err) {
    console.error(err);
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
  LocationView.addHandlerHome(controlHome);
  controlStoredLocation();
}
