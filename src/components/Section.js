export class Section {
  constructor(renderer , containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElements(items) {
    items.forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
