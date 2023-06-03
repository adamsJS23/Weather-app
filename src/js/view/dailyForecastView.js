class DailyForecastView {
  _ParentContainer = document.querySelector(".result_container");
  _data;

  render(data) {
    this._data = data;
    // this._parentContainer.querySelector(".section-3").innerHTML = "";
    this._ParentContainer
      .querySelector(".section-3")
      .insertAdjacentHTML("afterbegin", this._generateMarkup(this._data));
  }

  _generateMarkup(data) {
    return `<div class="next_8_days"><ul class="list_2">
    ${this._generateDailyForecastMarkup(data)}   
  </ul></div>`;
  }

  _generateDailyForecastMarkup(data) {
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
}

export default new DailyForecastView();
