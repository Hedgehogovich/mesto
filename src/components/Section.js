export default class Section {
  constructor({items = [], renderer}, containerSelector) {
    this._initialItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderElements() {
    this._initialItems.forEach(item => this.addItem(this._renderer(item)));
  }
}
