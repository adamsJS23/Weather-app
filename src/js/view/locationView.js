class LocationView {
  _ParentContainer = document.querySelector(".result_container");
  _data;
  render(data) {
    this._data = data;
    console.log("data would rendered in a minute");
    this._ParentContainer.innerHTML = "";
    this._ParentContainer.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._data)
    );
  }
  _generateMarkup(data) {
    console.log(data);
    return `<div class="section section-1">
    <div class="location">
      <div class="location_header">
        <p class="location_name">
          <ion-icon
            class="icon icon-location"
            name="location-outline"
          ></ion-icon
          ><span>${data.locationName},<br />${data.countryName}</span>
        </p>
        <p class="forecast_date">${data.date}</p>
      </div>
      <p class="weather_description">
        <span class="weather_temp">${data.temp}°</span>${
      data.weatherDescription
    }
      </p>
      <img
        class="weather_img"
        src="https://openweathermap.org/img/wn/${data.icon}.png"
        alt="Current weather icon"
      />
      <div class="location_more_info">
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
          <span class="more_info_value">${data.feelsLike}°</span>
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
        <div class="more_info_box">
          <ion-icon
            class="icon icon-more_info"
            name="invert-mode-outline"
          ></ion-icon>
          <span class="more_info_value">${data.pressure / 100}</span>
          <span>pressure</span>
        </div>
        <div class="more_info_box">
          <ion-icon
            class="icon icon-more_info"
            name="eye-outline"
          ></ion-icon>
          <span class="more_info_value"
            >${
              data.visibility / 1000
            }<span class="more_info_unit">Km</span></span
          >
          <span>visibilty</span>
        </div>
        <div class="more_info_box">
          <ion-icon
            class="icon icon-more_info"
            name="grid-outline"
          ></ion-icon>
          <span>close</span>
        </div>
      </div>
    </div>
  </div>
  <div class="line_1">
    <div class="line-long"></div>
    <div class="line-short"></div>
    <div class="line-short"></div>
  </div>
  <div class="section section-2">
    <ul class="list_1">
      <li class="list_1_item list_1_item--active">
        Today
        <div class="dot dot-1 dot-active"></div>
      </li>
      <li class="list_1_item">
        Tomorrow
        <div class="dot dot-2"></div>
      </li>
      <li class="list_1_item list_1_item--3">
        Next 7 days
        <div class="dot dot-3"></div>
      </li>
    </ul>
    <div class="hourly_forecast">${this._generateHourlyForecastMarkup(data)}
      
    </div>
    <div class="location_weather_map"></div>
    <div class="next_7_days">
      <ul class="list_2">
        ${this._generateDailyForecastMarkuk(data)}   
      </ul>
    </div>
  </div>`;
  }

  _generateHourlyForecastMarkup(data) {
    const { hourly } = data;
    return hourly.map(
      (hourForecast) => `<div class="forecast">
              <span>${hourForecast.hour}</span>
              <img
                class="weather_img_tiny"
                src="https://openweathermap.org/img/wn/${hourForecast.icon}.png"
                alt="weather icon"
              />
              <span>${hourForecast.temp}°</span>
            </div>`
    ).join('');
  }

  _generateDailyForecastMarkuk(data) {
    const { daily } = data;
    return daily
      .map(
        (dayForecast) => `<li class="list_2_item">
    <span>${dayForecast.dayLong}</span>
    <span class="align_left">${dayForecast.dayNumeric}</span>
    <span>${dayForecast.min}°</span>
    <div class="line_2"></div>
    <span>${dayForecast.max}°</span>
    <img
      class="weather_img_tiny"
      src="https://openweathermap.org/img/wn/${dayForecast.icon}.png"
      alt="weather icon"
    />
  </li>`
      )
      .join("");
  }

  addHandlerClick(handler) {
    this._ParentContainer.addEventListener("click", function (e) {
      e.preventDefault();
      const location = e.target.closest(".location");
      if (!location) return;
      const { lat, lon, locationName, countryName } =
        e.target.closest(".location").dataset;

      console.log(lat, lon, locationName, countryName);
      handler({ lat, lon, locationName, countryName });
    });
  }
}

export default new LocationView();
