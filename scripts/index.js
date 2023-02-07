const initialsCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

//TEMPLATE
const template = document.querySelector('#cards-template').content.querySelector('.elements__item');
const imageArea = document.querySelector('.elements');
const imageSaveButton = document.querySelector('.form__save-button_type_place');
const placeInputTitle = document.querySelector('.form__input_type_place');
const placeInputLink = document.querySelector('.form__input_type_place-link');

//POPUPS
const profilePopup = document.querySelector('.popup_type_profile');
const placePopup = document.querySelector('.popup_type_place');
const imagePopup = document.querySelector('.popup_type_image');

//POPUPS CLOSE BUTTON
const profilePopupClose = profilePopup.querySelector('.popup__close-button');
const placePopupClose = placePopup.querySelector('.popup__close-button');
const imagePopupClose = imagePopup.querySelector('.popup__close-button');

//POPUPS OPEN BUTTON
const profilePopupOpen = document.querySelector('.profile__edit-button');
const placePopupOpen = document.querySelector('.profile__add-button');
const imagePopupOpen = template.querySelector('.elements__pic');

//PROFILE FORM
const formProfile = profilePopup.querySelector('.form_type_profile');  
const formPlace = placePopup.querySelector('.form_type_place');
const nameInput = profilePopup.querySelector('.form__input_type_name');
const jobInput = profilePopup.querySelector('.form__input_type_description');
const formSaveButtonProfile = document.querySelector('.form__save-button_type_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const togglePopup = function(popup) { 
    popup.classList.toggle('popup_opened');
};

//OPEN
profilePopupOpen.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  togglePopup(profilePopup)
});

placePopupOpen.addEventListener('click', function () {
  togglePopup(placePopup)
});


//CLOSE
profilePopupClose.addEventListener('click', function () {
  togglePopup(profilePopup)
});

placePopupClose.addEventListener('click', function () {
  togglePopup(placePopup)
});

imagePopupClose.addEventListener('click', function () {
  togglePopup(imagePopup)
});


//ЗАПОЛНЕНИЕ ФОРМЫ 

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    togglePopup(profilePopup);
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const newCardData = {}
  newCardData.name = placeInputTitle.value;
  newCardData.link = placeInputLink.value;
  const newCard = createCard(newCardData);
  renderCard(newCard, imageArea);
  togglePopup(placePopup);
}

//УДАЛЕНИЕ 

function deleteCard (e) {
  e.target.closest('.elements__item').remove();
}
//СОЗДАНИЕ КАРТОЧЕК

function createCard (element) {
  const card = template.cloneNode(true);
  card.querySelector('.elements__name').textContent = element.name;
  card.querySelector('.elements__pic').src = element.link;
  card.querySelector('.elements__pic').alt = element.name;
  const imagePopupCard = imagePopup.querySelector('.popup__card');
  const imagePopupText = imagePopup.querySelector('.popup__text');
  const cardImage = card.querySelector('.elements__pic');
  cardImage.addEventListener('click', function () {
    imagePopupCard.src = element.link;
    imagePopupText.textContent = element.name;
    togglePopup(imagePopup);
  });
  card.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active'); 
  });
  return card;
  }

  function renderCard(card, container) {
    container.prepend(card);
  }

  initialsCards.forEach(cardData => {
    const newCard = createCard(cardData);
    renderCard(newCard, imageArea)
  });

  formProfile.addEventListener('submit', handleFormSubmit);
  imageSaveButton.addEventListener('click', togglePopup);
  formPlace.addEventListener('submit', handleCardFormSubmit);