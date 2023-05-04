class LocationListView {
  _btnAdd = document.querySelector(".btn-add");
  _iptAdd = document.querySelector(".ipt-add");
  _ParentContainer = document.querySelector(".result_container");
  _data;
  getQuery() {
    return this._iptAdd.value;
  }
  render(data) {
    this._data = data;
    console.log("data would rendered in a minute");

    this._ParentContainer.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._data)
    );
  }
  _generateMarkup(data) {
    return `<div class="location" data-country-name="${data.countryName}" data-location-name="${data.locationName}"  data-lat="${data.locationLat}" data-lon="${data.locationLon}" >
                <div class="location_detail">
                  <p class="location_name">
                    <ion-icon
                      class="icon icon-location"
                      name="location-outline"
                    ></ion-icon
                    >${data.locationName},<br />${data.countryName}
                  </p>
                  <p class="forecast_date">${data.date}</p>
                </div>
                <p class="weather_description">
                  <span class="weather_temp">${data.temp}°</span>${data.weatherDescription}
                </p>
                <img
                  class="weather_img"
                  src="https://openweathermap.org/img/wn/02d@2x.png"
                  alt="Current weather icon"
                /></div
            >`;
  }
  addHandlerAdd(handler) {
    this._btnAdd.addEventListener("click", () => handler());
  }

  addHandlerEnter(handler) {
    window.addEventListener("keypress", function (e) {
      e.keyCode == 13 && handler();
    });
  }
}

export default new LocationListView();
