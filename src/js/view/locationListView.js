class LocationListView {
  _btnAdd = document.querySelector(".btn-add");
  _iptAdd = document.querySelector(".ipt-add");
  getQuery() {
    return this._iptAdd.value;
  }
  
  addHandlerAdd(handler) {
    this._btnAdd.addEventListener("click", () => handler());
  }

  addHandlerEnter(handler){
    window.addEventListener('keypress', function (e){
      e.keyCode==13 && handler()
    })
  }
}

export default new LocationListView();
