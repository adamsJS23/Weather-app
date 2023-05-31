class LocationView {
  _parentContainer = document.querySelector(".result_container");
  _iptAdd = document.querySelector(".ipt-add");
  _data;
  _btnApp = document.querySelector(".btn-app");
  render(data) {
    this._data = data;
    this._parentContainer.innerHTML = "";
    this._parentContainer.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._data)
    );

    this._toggleIcon();
    this._diseableInput();
  }

  _generateMarkup(data) {
    return `
    <div class="section section-1">
    <div class="location_complete_info">
      <div class="location_header">
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
            >${data.clouds}</span
          >
          <span>rainfall</span>
        </div>
        <div class="more_info_box">
          <ion-icon
            class="icon icon-more_info"
            name="water-outline"
          ></ion-icon>
          <span class="more_info_value"
            >${data.humidity}</span
          >
          <span>humidity</span>
        </div>
        <div class="more_info_box">
          <ion-icon
            class="icon icon-more_info"
            name="golf-outline"
          ></ion-icon>
          <span class="more_info_value"
            >${data.windSpeed}</span
          >
          <span>wind</span>
        </div>
        <div class="more_info_box">
          <ion-icon
            class="icon icon-more_info"
            name="invert-mode-outline"
          ></ion-icon>
          <span class="more_info_value">${data.pressure}</span>
          <span>pressure</span>
        </div>
        <div class="more_info_box">
          <ion-icon
            class="icon icon-more_info"
            name="eye-outline"
          ></ion-icon>
          <span class="more_info_value"
            >${data.visibility}</span
          >
          <span>visibilty</span>
        </div>
        <div class="more_info_box">
          <ion-icon
            class="icon icon-more_info"
            name="earth-outline"
          ></ion-icon>
          <span class="more_info_value"
            >${data.aqi}</span
          >
          <span>air quality</span>
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
      <li class="list_1_item today list_1_item-active">
        Today
        <div class="dot dot-1 dot-active"></div>
      </li>
      <li class="list_1_item tomorrow">
        Tomorrow
        <div class="dot dot-2"></div>
      </li>
      <li class="list_1_item next_7_day list_1_item-3">
        Next 7 days
        <div class="dot dot-3"></div>
      </li>
    </ul>
  </div>
  <div class=" section section-3">
  </div>`;
  }

  _toggleIcon() {
    Array.from(document.querySelectorAll(".icon-app")).forEach((icon) =>
      icon.classList.toggle("hidden")
    );
  }

  _removeActiveLink() {
    Array.from(document.querySelectorAll(".list_1_item")).forEach((link) =>
      link.classList.remove("list_1_item-active")
    );
  }

  _removeActiveDot() {
    Array.from(document.querySelectorAll(".dot")).forEach((link) =>
      link.classList.remove("dot-active")
    );
  }

  _diseableInput() {
    this._iptAdd.disabled = true;
  }

  _enableInput() {
    this._iptAdd.disabled = false;
  }

  clear() {
    this._parentContainer.querySelector(".section-3").innerHTML = "";
  }

  addHandlerHome(handler) {
    this._btnApp.addEventListener(
      "click",
      function (e) {
        if (!e.target.classList.contains("icon-home")) return;
        this._toggleIcon();
        this._enableInput();
        handler();
      }.bind(this)
    );
  }

  addHandlerMenuClick(handler) {
    this._parentContainer.addEventListener(
      "click",
      function (e) {
        if (!e.target.classList.contains("list_1_item")) return;
        const targetMenu = e.target.getAttribute("class").split(" ").at(1);
        this._removeActiveLink();
        this._removeActiveDot();
        if (targetMenu === "today") {
          document.querySelector(".today").classList.add("list_1_item-active");
          document.querySelector(".dot-1").classList.add("dot-active");
        }
        if (targetMenu === "tomorrow") {
          document
            .querySelector(".tomorrow")
            .classList.add("list_1_item-active");
          document.querySelector(".dot-2").classList.add("dot-active");
        }
        if (targetMenu === "next_7_day") {
          document
            .querySelector(".next_7_day")
            .classList.add("list_1_item-active");
          document.querySelector(".dot-3").classList.add("dot-active");
        }
        handler(targetMenu);
      }.bind(this)
    );
  }
}

export default new LocationView();
