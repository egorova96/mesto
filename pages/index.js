import {Card} from '../components/Сard.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../components/constants.js';
import {formProfile} from '../components/constants.js';
import {formPlace} from '../components/constants.js';
import {addButton} from '../components/constants.js';
import {editButton} from '../components/constants.js';
import {validationConfig} from '../components/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/Userinfo.js';

//--------------------------------------------------------------------------------------------------------------
//Попап профиля
const userInfo = new UserInfo ({nameSelector: '.profile__name', descriptionSelector: '.profile__description'})
const handleProfileFormSubmit = ({name, description}) => {
  userInfo.setUserInfo({name, description});
}
const profilePopup = new PopupWithForm ('.popup_type_profile', handleProfileFormSubmit);
profilePopup.setEventListeners();
//---------------------------------------------------------------------------------------------------------------
//Попап с картинкой
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const handleCardClick = (data) => {
  popupWithImage. open(data)
}
//---------------------------------------------------------------------------------------------------------------
//Добавление карточек
function createCard(item) {
  const cardElement = new Card (
    item,
    '#cards-template',
    () => {popupWithImage.open(item)}
  ).generateCard();
    return cardElement
};

const cardData = { 
items: initialCards,
renderer: createCard
};

const cardSection = new Section(cardData, '.elements', handleCardClick);
cardSection.renderItems();
//----------------------------------------------------------------------------------------------------------------
//Попап добавления места
const handleCardFormSubmit = ({name, description}) => {
  cardSection.addItem(createCard({name: name, link: description}));
};

const placePopup = new PopupWithForm('.popup_type_place', handleCardFormSubmit);
placePopup.setEventListeners();
//----------------------------------------------------------------------------------------------------------------
//Валидация
const profileFormValidator = new FormValidator(validationConfig, formProfile); 
const placeFormValidator = new FormValidator(validationConfig, formPlace);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
//----------------------------------------------------------------------------------------------------------------
//Открытие попапа

function handleAddCardButtonClick() {
  placePopup.open();
}

function handleEditProfileButtonClick() {
  profileFormValidator.blockSubmitButton()
  profilePopup.open();
}

addButton.addEventListener('click', handleAddCardButtonClick);
editButton.addEventListener('click', handleEditProfileButtonClick);

