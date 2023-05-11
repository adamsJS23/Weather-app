class MapView {
  _parentContainer = document.querySelector(".result_container");
  _data;

  render(data) {
    this._data = data;
    this._parentContainer.querySelector('.section-3').insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(this._data)
    );
  }

  _generateMarkup(data) {
    return `<div class="location_weather_map"></div>`;
  }
}

export default new MapView();
