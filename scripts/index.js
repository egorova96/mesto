//TEMPLATE
const template = document.querySelector('#cards-template').content.querySelector('.elements__item');
const imageArea = document.querySelector('.elements');
const imageSaveButton = document.querySelector('.form__save-button_type_place');
const placeInputTitle = document.querySelector('.form__input_type_place');
const placeInputLink = document.querySelector('.form__input_type_place-link');
const likeButton = template.querySelector('.elements__like');

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
const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.form');  
const nameInput = formElement.querySelector('.form__input_type_name');
const jobInput = formElement.querySelector('.form__input_type_description');
const formSaveButton = formElement.querySelector('.form__save-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formSubmitButton = document.querySelector('form__save-button');

const allPopupsToggle = function(popup) { 
    popup.classList.toggle('popup_opened')
};

//OPEN
profilePopupOpen.addEventListener('click', function () {
    allPopupsToggle(profilePopup)
});

placePopupOpen.addEventListener('click', function () {
    allPopupsToggle(placePopup)
});

const openPopup = function() {
  popupElement.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};


//CLOSE
profilePopupClose.addEventListener('click', function () {
    allPopupsToggle(profilePopup)
});


placePopupClose.addEventListener('click', function () {
    allPopupsToggle(placePopup)
});

imagePopupClose.addEventListener('click', function () {
    allPopupsToggle(imagePopup)
});

imageSaveButton.addEventListener('click', function () {
  allPopupsToggle(placePopup)
});


function closePopup() {
    popupElement.classList.remove('popup_opened');
}

profilePopupOpen.addEventListener('click', openPopup);
profilePopupClose.addEventListener('click', closePopup);

//ЗАПОЛНЕНИЕ ФОРМЫ 

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup;
}

formSaveButton.addEventListener('click', handleFormSubmit);
formSaveButton.addEventListener('click', closePopup);


//СОЗДАНИЕ КАРТОЧЕК
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

  function renderCards (elements) {

        const card = template.cloneNode(true);

        card.querySelector('.elements__name').textContent = elements.name;
        card.querySelector('.elements__pic').src = elements.link;
        card.querySelector('.elements__pic').alt = elements.name;
        const imagePopupCard = imagePopup.querySelector('.popup__card');
        const imagePopupText = imagePopup.querySelector('.popup__text');
        const cardImage = card.querySelector('.elements__pic');
        cardImage.addEventListener('click', function () {
          imagePopupCard.src = elements.link;
          imagePopupText.textContent = elements.name;
         allPopupsToggle(imagePopup);
      });
        card.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
        card.querySelector('.elements__like').addEventListener('click', function (evt) {
          evt.target.classList.toggle('elements__like_active'); 
         });
        imageArea.append(card);
  }

    function render () {
    initialsCards.forEach(renderCards)
    }

    render();

  imageSaveButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const placeTitle = placeInputTitle.value;
    const placeLink = placeInputLink.value;
    const card = template.cloneNode(true);
    card.querySelector('.elements__name').textContent = placeTitle;
    card.querySelector('.elements__pic').src = placeLink;
    const cardImage = card.querySelector('.elements__pic');
    cardImage.addEventListener('click', function () {
      allPopupsToggle(imagePopup);
    });
    imageArea.prepend(card)
    imagePopupOpen.addEventListener('click', function () {
      allPopupsToggle(imagePopup)
  });
   card.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
   card.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active'); 
   });
  });


function deleteCard (e) {
  e.target.closest('.elements__item').remove();
}
