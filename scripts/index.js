import {initialsCards } from './cardsMassive.js';
import {Card} from './Сards.js';
import { FormValidator } from './FormValidator.js';

const imagePopup = document.querySelector(".popup_type_image");
const openPopupImage = imagePopup.querySelector('.popup__card');
const openPopupText = imagePopup.querySelector('.popup__text')

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: ".form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
const profilePopup = document.querySelector(".popup_type_profile");
const placePopup = document.querySelector(".popup_type_place");
const formProfile = profilePopup.querySelector(".form_type_profile");
const formPlace = placePopup.querySelector(".form_type_place");
const cardsSection = document.querySelector('.elements');

//ДЛЯ ВАЛИДАЦИИ
const profileFormValidator = new FormValidator(validationConfig, formProfile); 
const placeFormValidator = new FormValidator(validationConfig, formPlace);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

//POPUPS
const popupList = document.querySelectorAll(".popup");

//BUTTONS
const profilePopupOpen = document.querySelector(".profile__edit-button");
const placePopupOpen = document.querySelector(".profile__add-button");

//PROFILE FORM
const nameInput = profilePopup.querySelector(".form__input_type_name");
const jobInput = profilePopup.querySelector(".form__input_type_description");
const placeNameInput = placePopup.querySelector('.form__input_type_place');
const placeLinkInput = placePopup.querySelector('.form__input_type_place-link');
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// ОТКРЫТИЕ ПОПАПА
const openPopup = function (popup) {
  document.addEventListener("keydown", closePopupEsc);
  popup.classList.add("popup_opened");
};

profilePopupOpen.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
});

placePopupOpen.addEventListener("click", function () {
  openPopup(placePopup);
});


//ЗАКРЫТИЕ ПОПАПА
const popupClose = function (popup) {
  document.removeEventListener("keydown", closePopupEsc);
  popup.classList.remove("popup_opened");
};

//ЗАПОЛНЕНИЕ ФОРМЫ ПРОФИЛЯ
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupClose(profilePopup);
}
            
// ЗАКРЫТИЕ ПО ОВЕРЛЕЮ И КРЕСТИКУ
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup__close-button")) {
      popupClose(popup);
    }
    if (evt.target.classList.contains("popup_opened")) {
      popupClose(popup);
    }
  });
});

//ЗАКРЫТИЕ ПО ESC
const closePopupEsc = function (event) {
  if (event.key === "Escape") {
    const element = document.querySelector(".popup_opened");
    popupClose(element);
  }
};

//СОЗДАНИЕ И ДОБАВЛЕНИЕ КАРТОЧКИ
const createCard = (cardData) => {
  const card = new Card(cardData, cardsSection);
  const cardElement = card.generateCard();
  return cardElement;
};

function renderCard(initialsCards) {
  initialsCards.forEach((cardData) => {
    cardsSection.prepend(createCard(cardData));
  });
};

renderCard(initialsCards);

// ЗАПОЛНЕНИЕ ФОРМЫ КАРТОЧКИ
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard =[
    {name: placeNameInput.value,
    link: placeLinkInput.value}
  ]
  renderCard(newCard);
  popupClose(placePopup);
  formPlace.reset();
  placeFormValidator.blockSubmitButton(); 
};

formProfile.addEventListener("submit", handleProfileFormSubmit);
formPlace.addEventListener("submit", handleCardFormSubmit);

export {openPopup, imagePopup, openPopupImage, openPopupText};
