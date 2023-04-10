import Popup from "../components/Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
  };

handleSubmitButtonClick(event) {
  this._handleSubmit = event;
};

open({cardId, cards}) {
  super.open();
  this._cardId = cardId;
  this._cards = cards;
};

setEventListeners() {
  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleSubmit({cardId: this._cardId, cards: this._cards});
  })
};
}
