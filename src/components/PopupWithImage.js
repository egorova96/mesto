import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super (popupSelector);
        this._image = this._popup.querySelector('.popup__card');
        this._title = this._popup.querySelector('.popup__text');
    }

    open(data) {
        this._image.src = data.link;
        this._image.alt = data.name;
        this._title.textContent = data.name
        super.open()
    }
}