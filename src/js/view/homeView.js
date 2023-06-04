class HomeView {
  _btnApp = document.querySelector(".btn-app");
  _iptAdd = document.querySelector(".ipt-add");
  _parentContainer = document.querySelector(".result_container");
  _data;
  _spinner;
  _messageBox;

  getQuery() {
    const query = this._iptAdd.value;
    this._iptAdd.value = "";
    this._iptAdd.blur();
    return query;
  }

  render(data) {
    this._data = data;
    if (!data) return;
    this._parentContainer.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._data)
    );
  }

  _generateMarkup(data) {
    return `<div class="location" data-country-name="${data.countryName}" data-location-name="${data.locationName}"  data-lat="${data.lat}" data-lon="${data.lon}" >
                
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
                          <span class="weather_temp">${data.temp}<span class="celsius">°C</span></span>
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

  addHandlerClick(handler) {
    this._parentContainer.addEventListener("click", function (e) {
      e.preventDefault();
      const location = e.target.closest(".location");
      if (!location) return;
      const { lat, lon, locationName, countryName } =
        e.target.closest(".location").dataset;

      handler({ lat, lon, locationName, countryName });
    });
  }

  renderError(errorMessage) {
    const markup = `<div class="error">
    <ion-icon class="icon" name="warning-outline"></ion-icon><p>${errorMessage}</p>
                    </div>`;
    this._parentContainer.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = "There is not stored location") {
    const markup = `<div class="message">
    <ion-icon class="icon" name="information-circle-outline"></ion-icon><p>${message}</p>
                    </div>`;
    this._parentContainer.insertAdjacentHTML("afterbegin", markup);
  }

  removeErrorMessage() {
    this._parentContainer.querySelector(".error").remove();
  }

  removeMessage() {
    this._parentContainer.querySelector(".message").remove();
  }

  renderSpinner() {
    this._spinner = document.createElement("div");
    this._spinner.innerHTML = `<div class="spinner">
    <div class="loader"></div>
    </div>`;
    this._parentContainer.prepend(this._spinner);
  }

  renderMessageBox(message, error = false) {
    this._messageBox = document.createElement("div");
    this._messageBox.classList.add("message_box");
    this._messageBox.classList.add(`${error ? "message" : "error"}`);
    if (!error) {
      this._messageBox.innerHTML = `<ion-icon class="icon" name="information-circle-outline"></ion-icon>
      <p>${message}</p>
          `;
    } else {
      this._messageBox.innerHTML = `<ion-icon class="icon" name="warning-outline"></ion-icon>
      <p>${message}</p>
          `;
    }

    this._parentContainer.prepend(this._messageBox);
  }

  removeMessageBox() {
    this._messageBox.remove();
  }

  removeSpinner() {
    this._spinner.remove();
  }

  clear() {
    this._parentContainer.innerHTML = "";
  }
}

export default new HomeView();
