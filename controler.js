import LocationListView from "./src/js/view/locationListView.js";
import LocationView from "./src/js/view/locationView.js";
import * as model from "./model.js";
async function controlLocation() {
  const query = LocationListView.getQuery();
  await model.findLocation(query);
  LocationListView.render(model.state.currentLocation);
}

async function controlDisplayLocation(data) {
  await model.displayLocation(data)
  LocationView.render((model.state.locationCompleteDate))
}

init();
function init() {
  LocationListView.addHandlerAdd(controlLocation);
  LocationListView.addHandlerEnter(controlLocation);
  LocationView.addHandlerClick(controlDisplayLocation);
}
