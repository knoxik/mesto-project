export class Section {
  constructor({ items, renderer }, containerSelector) {
    this.renderedItems = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this.renderedItems.forEach(item => {
      this.renderer(item);
    });
  }
}

export const cardList = new Section({}, '.card-grid')
