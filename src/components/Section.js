export default class Section {
  constructor({items = [], renderer}, containerSelector) {
    this._initialItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  appendItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderElements() {
    this._initialItems.forEach(item => this.appendItem(this._renderer(item)));
  }
}
