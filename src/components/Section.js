export default class Section {
  constructor({ renderer, items }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }

  addItem(container) {
    this._element.prepend(container);
  }
}
