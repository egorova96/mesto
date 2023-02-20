//ВАЛИДАЦИЯ ФОРМЫ

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.textContent = " ";
  errorElement.classList.remove(object.errorClass);
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, object) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      object
    );
  } else {
    hideInputError(formElement, inputElement, object);
  }
};

// добавляем слушатели
const setEventListeners = (formElement, object) => {
  const inputList = Array.from(
    formElement.querySelectorAll(object.inputSelector)
  );
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    });
  });
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, object);
  });
};

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: ".form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// Вызовем функцию
enableValidation(validationConfig);

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//ДЕАКТИВАЦИЯ КНОПКИ

const toggleButtonState = (inputList, buttonElement, object) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.setAttribute("disabled", " ");
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", " ");
  }
};