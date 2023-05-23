class HomeView {
  _ParentContainer = document.querySelector(".result_container");
  _data;

  render(data, location) {
    this._data = data;
    // this.clear();
    this._ParentContainer.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._data, location)
    );
  }

  _generateMarkup(data, location) {
    console.log(data)
    return `            <div class="location" data-country-name="${location.countryName}" data-location-name="${location.locationName}"  data-location-lat="${location.lat}" data-location-lon="${location.lon}" >
                        <div class="weather_description">
                            <div class="location_detail">
                              <p class="location_name">
                                <ion-icon
                                  class="icon icon-location"
                                  name="location-outline"
                                ></ion-icon
                                >${location.locationName},<br />${location.countryName}
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
                        </div>
                      </div
 >`;
  }

  clear() {
    this._ParentContainer.innerHTML = "";
  }
}

export default new HomeView();
