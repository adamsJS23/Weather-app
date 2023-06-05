class MapView {
  _parentContainer = document.querySelector(".result_container");
  _data;
  _map;
  render(data) {
    this._data = data;
    this._parentContainer
      .querySelector(".section-3")
      .insertAdjacentHTML("beforeend", this._generateMarkup());
      this._loadMap(this._data);
    }
    
    _loadMap(data) {
    const { lat, lon, temp, locationName, countryName } = data;
    this._map = L.map("map").setView([lat, lon], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);

    this.renderMarker(data)
  }

  renderMarker(data){
    const { lat, lon, temp, locationName, countryName } = data;
    L.marker([lat, lon])
      .addTo(this._map)
      .bindPopup(
        L.popup({
          maxHeight: 100,
          maxWidth: 300,
          autoClose: false,
          closeOnClick: false,
          closeButton:false,
          className: `popup`,
        })
      )
      .setPopupContent(
        `${locationName}, ${temp}°`
      )
      .openPopup();
  }

  _generateMarkup(data) {
    return `<div id="map" class="location_weather_map"></div>`;
  }

  clear() {
    this._parentContainer.querySelector(".section-2").querySelector('.hourly_forescast').innerHTML = "";
  }
}

export default new MapView();
