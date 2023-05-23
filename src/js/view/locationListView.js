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
    console.log(data);
    this._data = data;
    this._ParentContainer.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._data)
    );
  }

  _generateMarkup(data) {
    return `<div class="location" data-country-name="${data.countryName}" data-location-name="${data.locationName}"  data-location-lat="${data.lat}" data-location-lon="${data.lon}" >
                
                <div class="weather_description">
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
                            <img
                                class="weather_img"
                                src="https://openweathermap.org/img/wn/${data.icon}@2x.png"
                                alt="Current weather icon"
                              />
                        </div>
                        <div class="weather_temp_box">
                          <span class="weather_temp">${data.temp}</span>
                          <span class="weather_description">${data.weatherDescription}</span>
                        </div>
                `;
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

  renderError(errorMessage) {
    const markup = `<div class="error">
    <ion-icon class="icon error-icon" name="warning-outline"></ion-icon><p>${errorMessage}</p>
                    </div>`;
    this._ParentContainer.innerHTML = "";
    this._ParentContainer.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this._ParentContainer.innerHTML = "";
  }
}

export default new LocationListView();
