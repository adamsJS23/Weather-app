class HourlyForecastView {
  _parentContainer = document.querySelector(".result_container");
  _data;

  render(data, scrollTo) {
    this._data = data;
    // this._parentContainer.querySelector(".hourly_forecast").innerHTML = "";
    this._parentContainer
      .querySelector(".section-2").querySelector(".hourly_forescast")
      .insertAdjacentHTML(
        "beforeend",
        this._generateMarkup(this._data, scrollTo)
      );
  }

  _generateMarkup(data, scrollTo) {
    return `<div class="hourly_forecast"><button class="arrow arrow-left" data-scroll-to="${
      scrollTo ? scrollTo : 0
    }"><ion-icon  class="icon icon-left" name="chevron-back-outline"></ion-icon></button>${this._generateHourlyForecastMarkup(
      data
    )}<button class="arrow arrow-right" data-scroll-to="${
      scrollTo ? scrollTo : 0
    }"><ion-icon class="icon icon-left" name="chevron-forward-outline"></ion-icon></button>
    </div>`;
  }

  _generateHourlyForecastMarkup(data) {
    // const { hourly } = data;
    return data
      .map(
        (hourForecast) => `
                <div class="forecast">
                  <span class="${
                    hourForecast.hour.length > 2 ? "hourly_forcast_hour" : ""
                  }">${
          hourForecast.hour.length <= 2 ? hourForecast.hour + ":00" : ""
        }</span>
                  <img
                    class="weather_img_tiny"
                    src="https://openweathermap.org/img/wn/${
                      hourForecast.icon
                    }.png"
                    alt="weather icon"
                  />
                  <span>${hourForecast.temp}°</span>
                </div>
            `
      )
      .join("");
  }

  addHandlerArrowClicked(handler) {
    this._parentContainer.addEventListener("click", function (e) {
      const btn = e.target.closest("button");
      if (!btn) return;
      let { scrollTo } = btn.dataset;

      btn.classList.contains("arrow-left") ? scrollTo-- : scrollTo++;
      if (scrollTo > 3) scrollTo = 0;
      if (scrollTo < 0) scrollTo = 3;
      handler(scrollTo);
    });
  }

  clear() {
    this._parentContainer.querySelector(".section-2").querySelector('.hourly_forescast').innerHTML = "";
  }
}

export default new HourlyForecastView();
