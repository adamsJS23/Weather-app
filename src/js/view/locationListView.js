class LocationListView {
  _btnApp = document.querySelector(".btn-app");
  _iptAdd = document.querySelector(".ipt-add");
  _ParentContainer = document.querySelector(".result_container");
  _data;

  getQuery() {
    const query = this._iptAdd.value;
    this._iptAdd.value = "";
    this._iptAdd.blur();
    return query;
  }

  render(data) {
    this._data = data;
    this._ParentContainer.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._data)
    );
  }

  _generateMarkup(data, lat, lon) {
    return `<div class="location" data-country-name="${data.countryName}" data-location-name="${data.locationName}"  data-location-lat="${lat}" data-location-lon="${lon}" >
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
                  src="https://openweathermap.org/img/wn/${data.icon}@2x.png"
                  alt="Current weather icon"
                /></div
            >`;
  }
  addHandlerAdd(handler) {
    this._btnApp.addEventListener("click", function (e) {
      if (!e.target.classList.contains("icon-add")) return;
      handler();
    });
  }

  addHandlerEnter(handler) {
    window.addEventListener("keypress", function (e) {
      e.keyCode == 13 && handler();
    });
  }
}

export default new LocationListView();
