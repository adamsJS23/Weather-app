class HourlyForecastView {
  _ParentContainer = document.querySelector(".result_container");
  _data;

  render(data,scrollTo) {
    this._data = data;
    // this._parentContainer.querySelector(".hourly_forecast").innerHTML = "";
    this._ParentContainer
      .querySelector(".section-3")
      .insertAdjacentHTML("afterbegin", this._generateMarkup(this._data));
  }

  _generateMarkup(data,scrollTo) {
    return `<div class="hourly_forecast"><button class="arrow arrow-left" data-scroll-to="${scrollTo?scrollTo:0}"><ion-icon  class="icon icon-left" name="chevron-back-outline"></ion-icon></button>${this._generateHourlyForecastMarkup(
      data
    )}<button class="arrow arrow-right" data-scroll-to="${scrollTo?scrollTo:0}"><ion-icon class="icon icon-left" name="chevron-forward-outline"></ion-icon></button>
    </div>`;
  }

  _generateHourlyForecastMarkup(data) {
    // const { hourly } = data;
    return data
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

  addHandlerArrowClicked(handler) {
    this._ParentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest("button");
      if (!btn) return;
      let { scrollTo } = btn.dataset;
      btn.classList.contains("arrow-left") ? scrollTo-- : scrollTo++;
      handler(scrollTo);
    });
  }
}

export default new HourlyForecastView();
