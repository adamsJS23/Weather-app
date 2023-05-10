class HourlyForecastView {
  _ParentContainer = document.querySelector(".result_container");
  _data;

  render(data) {
    this._data = data;
    // this._parentContainer.querySelector(".hourly_forecast_box").innerHTML = "";
    this._ParentContainer
      .querySelector(".hourly_forecast_box")
      .insertAdjacentHTML("afterbegin", this._generateMarkup(this._data));
  }

  _generateMarkup(data) {
    return `<div class="hourly_forecast"><button class="arrow arrow-left"><ion-icon  class="icon icon-left" name="chevron-back-outline"></ion-icon></button>${this._generateHourlyForecastMarkup(
      data
    )}<button class="arrow arrow-right"><ion-icon class="icon icon-left" name="chevron-forward-outline"></ion-icon></button>
            
          </div>`;
  }

  _generateHourlyForecastMarkup(data) {
    const { hourly } = data;
    return hourly
      .slice(12, 18)
      .map(
        (hourForecast) => `
                <div class="forecast">
                  <span>${hourForecast.hour}</span>
                  <img
                    class="weather_img_tiny"
                    src="https://openweathermap.org/img/wn/${hourForecast.icon}.png"
                    alt="weather icon"
                  />
                  <span>${hourForecast.temp}°</span>
                </div>
            `
      )
      .join("");
  }
}

export default new HourlyForecastView();
