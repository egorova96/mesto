export default class Section {
    constructor({ items, renderer }, containerSelector) {
        //this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(cardData) {
        cardData.reverse().forEach((card) => {
            this._renderer(card);
        });
    }

    addItem(item) {
        this._container.prepend(item);
    }

}