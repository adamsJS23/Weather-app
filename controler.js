import LocationListView from "./src/js/view/locationListView.js";
import LocationView from "./src/js/view/locationView.js";
import * as model from "./model.js";
import HomeView from "./src/js/view/homeView.js";

function controlStoredLocation() {
  HomeView.render(model.state.storedLocation);
}

async function controlLocation() {
  try {
    const query = LocationListView.getQuery();
    await model.findLocation(query, false);
    LocationListView.render(model.state.currentLocation);

    // LoacationHourlyFarecastView.render() feature
    // LocationMapView.render.render feature

    //Create next7dayView feature
  } catch (err) {
    console.error(err);
  }
}

async function controlDisplayLocation(data) {
  try {
    await model.displayLocation(data);
    LocationView.render(model.state.locationCompleteDate);
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
