class HomeView {
  _ParentContainer = document.querySelector(".result_container");
  _data;

  render(data) {
    this._data = data;
    this._clear();
    this._ParentContainer.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._data)
    );
  }

  _generateMarkup(data) {
    return data
      .map(
        (
          location
        ) => `<div class="location" data-country-name="${location.countryName}" data-location-name="${location.locationName}"  data-lat="${location.locationLat}" data-lon="${location.locationLon}" >
                        <div class="location_detail">
                          <p class="location_name">
                            <ion-icon
                              class="icon icon-location"
                              name="location-outline"
                            ></ion-icon
                            >${location.locationName},<br />${location.countryName}
                          </p>
                          <p class="forecast_date">${location.date}</p>
                        </div>
                        <p class="weather_description">
                          <span class="weather_temp">${location.temp}°</span>${location.weatherDescription}
                        </p>
                        <img
                          class="weather_img"
                          src="https://openweathermap.org/img/wn/${location.icon}@2x.png"
                          alt="Current weather icon"
                /></div
 >`
      )
      .join("");
  }

  _clear() {
    this._ParentContainer.innerHTML = "";
  }
}

export default new HomeView();
