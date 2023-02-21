//ВАЛИДАЦИЯ ФОРМЫ

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: ".form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = " ";
  errorElement.classList.remove(validationConfig.errorClass);
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// добавляем слушатели
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

// Вызовем функцию
enableValidation(validationConfig);

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//ДЕАКТИВАЦИЯ КНОПКИ

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", " ");
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", " ");
  }
};