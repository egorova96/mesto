class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    this._buttonElement = this._form.querySelector(this._validationConfig.submitButtonSelector);
  };

  _showInputError = (inputElement, errorMessage) => {
  const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._validationConfig.errorClass);
  };
  
  _hideInputError = (inputElement) => {
  const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._validationConfig.inputErrorClass);
  errorElement.textContent = '';
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

  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", " ");
    } else {
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", " ");
    }
  }

  _setEventListeners = () => {
    this._form.addEventListener('reset', () => 
    { setTimeout(() => {this.toggleButtonState() }, 1);
    });
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._isValid(inputElement);
          this.toggleButtonState(this._validationConfig);
        });
      });
    }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
        this._setEventListeners();
      };
  }

export {FormValidator};


  