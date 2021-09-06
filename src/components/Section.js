class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  prependItem(item) {
    this._container.prepend(item);
  }

  appendItem(item) {
    this._container.append(item);
  }
}

export { Section }