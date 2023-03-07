class FormValidator {
  constructor(validationConfig, formList) {
    this._validationConfig = validationConfig;
    this._formList = formList;
    this._inputList = Array.from(this._formList.querySelectorAll(this._validationConfig.inputSelector));
    this._buttonElement = this._formList.querySelector(this._validationConfig.submitButtonSelector);
  };

  _showInputError = (inputElement, errorMessage) => {
  const errorElement = this._formList.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._validationConfig.errorClass);
  };
  
  _hideInputError = (inputElement) => {
  const errorElement = this._formList.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._validationConfig.inputErrorClass);
  errorElement.textContent = " ";
  errorElement.classList.remove(this._validationConfig.errorClass);
  }

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
      );
    } else {
      this._hideInputError(inputElement);
    };
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", " ");
    } else {
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", " ");
    }
  }

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._validationConfig);
      });
    });
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation = () => {
      const formList = Array.from(document.querySelectorAll(this._validationConfig.formSelector));
      formList.forEach(() => {
        this._setEventListeners();
      });
  }
}

export {FormValidator};


  