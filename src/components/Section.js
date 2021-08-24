class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(item) {
    this._container.prepend(item);
  }
}

export { Section }