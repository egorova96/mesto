//TEMPLATE
const cardTemplate = document
  .querySelector("#cards-template")
  .content.querySelector(".elements__item");
const imageArea = document.querySelector(".elements");
const placeInputTitle = document.querySelector(".form__input_type_place");
const placeInputLink = document.querySelector(".form__input_type_place-link");

//POPUPS
const profilePopup = document.querySelector(".popup_type_profile");
const placePopup = document.querySelector(".popup_type_place");
const imagePopup = document.querySelector(".popup_type_image");
const popupList = document.querySelectorAll(".popup");

//POPUPS CLOSE BUTTON
const popupCloseButtonList = document.querySelectorAll(".popup__close-button");
const placeSaveButton = placePopup.querySelector(
  ".form__save-button_type_place"
);

//POPUPS OPEN BUTTON
const profilePopupOpen = document.querySelector(".profile__edit-button");
const placePopupOpen = document.querySelector(".profile__add-button");

//PROFILE FORM
const formProfile = profilePopup.querySelector(".form_type_profile");
const formPlace = placePopup.querySelector(".form_type_place");
const nameInput = profilePopup.querySelector(".form__input_type_name");
const jobInput = profilePopup.querySelector(".form__input_type_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// ОТКРЫТИЕ ПОПАПА
const openPopup = function (popup) {
  document.addEventListener("keydown", closePopupEsc);
  popup.classList.add("popup_opened");
};

//OPEN
profilePopupOpen.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
});

placePopupOpen.addEventListener("click", function () {
  openPopup(placePopup);
});

//CLOSE
const popupClose = function (popup) {
  document.removeEventListener("keydown", closePopupEsc);
  popup.classList.remove("popup_opened");
};

//ЗАПОЛНЕНИЕ ФОРМЫ
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupClose(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {};
  newCardData.name = placeInputTitle.value;
  newCardData.link = placeInputLink.value;
  const newCard = createCard(newCardData);
  renderCard(newCard, imageArea);
  popupClose(placePopup);
  formPlace.reset();
  placeSaveButton.classList.add("form__save-button_disabled");
  placeSaveButton.setAttribute("disabled", " ");
}

//УДАЛЕНИЕ

function deleteCard(e) {
  e.target.closest(".elements__item").remove();
}
//СОЗДАНИЕ КАРТОЧЕК

function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".elements__name").textContent = cardData.name;
  card.querySelector(".elements__pic").src = cardData.link;
  card.querySelector(".elements__pic").alt = cardData.name;
  const imagePopupCard = imagePopup.querySelector(".popup__card");
  const imagePopupText = imagePopup.querySelector(".popup__text");
  const cardImage = card.querySelector(".elements__pic");
  cardImage.addEventListener("click", function () {
    imagePopupCard.src = cardData.link;
    imagePopupCard.alt = cardData.name;
    imagePopupText.textContent = cardData.name;
    openPopup(imagePopup);
  });
  card
    .querySelector(".elements__delete-button")
    .addEventListener("click", deleteCard);
  card
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_active");
    });
  return card;
}

function renderCard(card, container) {
  container.prepend(card);
}

initialsCards.forEach((cardData) => {
  const newCard = createCard(cardData);
  renderCard(newCard, imageArea);
});

formProfile.addEventListener("submit", handleProfileFormSubmit);
formPlace.addEventListener("submit", handleCardFormSubmit);

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