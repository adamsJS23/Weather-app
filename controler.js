import LocationListView from "./src/js/view/locationListView.js";
import * as model from "./model.js";
function controlLocation() {
  const query = LocationListView.getQuery();
  console.log(query);
  model.findLocation(query);
}
init();
function init() {
  LocationListView.addHandlerAdd(controlLocation);
  LocationListView.addHandlerEnter(controlLocation);
}
