class TomorrowView {
  _parentContainer = document.querySelector(".result_container");
  _data;
  render(data) {
    this._data = data;
    this._parentContainer.querySelector(".section-3").innerHTML = "";
    this._parentContainer
      .querySelector(".section-3")
      .insertAdjacentHTML("afterbegin", this._generateMarkup(this._data));
  }

  _generateMarkup(data) {
    return `<div class="location_complete_info tomorrow_info">
    <div class="tomorrow_location_header">
      <p class="forecast_date">${data.date}</p>
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
      
    <div class="tomorrow_more_info">
      <div class="more_info_box">
        <ion-icon
          class="icon icon-more_info"
          name="sunny-outline"
        ></ion-icon>
        <span class="more_info_value">${data.uvi}</span>
        <span>uv</span>
      </div>
      <div class="more_info_box">
        <ion-icon
          class="icon icon-more_info"
          name="thermometer-outline"
        ></ion-icon>
        <span class="more_info_value">${data.feelsLike}</span>
        <span>feels like</span>
      </div>
      <div class="more_info_box">
        <ion-icon
          class="icon icon-more_info"
          name="umbrella-outline"
        ></ion-icon>
        <span class="more_info_value"
          >${data.clouds}<span class="more_info_unit">%</span></span
        >
        <span>rainfall</span>
      </div>
      <div class="more_info_box">
        <ion-icon
          class="icon icon-more_info"
          name="water-outline"
        ></ion-icon>
        <span class="more_info_value"
          >${data.humidity}<span class="more_info_unit">%</span></span
        >
        <span>humidity</span>
      </div>
      <div class="more_info_box">
        <ion-icon
          class="icon icon-more_info"
          name="golf-outline"
        ></ion-icon>
        <span class="more_info_value"
          >${data.windSpeed}<span class="more_info_unit">Km/h</span></span
        >
        <span>wind</span>
      </div> 
    </div>
  </div>`;
  }

  clear() {
    this._parentContainer.querySelector(".section-3").innerHTML = "";
  }

  // _generateTomorrowMarkup() {}
}

export default new TomorrowView();
