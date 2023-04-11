import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.form__save-button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputsValues = {};
    this._inputList.forEach((input) => {
      inputsValues[input.name] = input.value
    });
    return inputsValues;
  }

 close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues());
      //this.close();
    })
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name].textContent;
    });
  }

  submitProcess(process, processText = 'Сохранение...') {
    if (process) {
      this._submitButton.textContent = processText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    };
  };
}
