import './index.css';
import {Card} from '../components/Сard.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/Userinfo.js';
import {formProfile} from '../utils/constants.js';
import {formPlace} from '../utils/constants.js';
import {addButton} from '../utils/constants.js';
console.log(addButton);
import {editButton} from '../utils/constants.js';
import {validationConfig} from '../utils/constants.js';
import { nameInput } from '../utils/constants.js';
import { descriptionInput } from '../utils/constants.js';
import { avatarEditBtn } from '../utils/constants.js';
import { formAvatar } from '../utils/constants.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

//API-----------------------------------------------------------------------------------------------------------
const api = new Api({
  mainUrl: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "c8003cca-5572-430e-8e9c-250a3cfc2feb",
    "Content-Type": "application/json",
  },
});

Promise.all([api.setUserInfo(), api.getInitialCards()]).then(([userData, cardData]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData);
  userInfo.setAvatarImg(userData);
  cardSection.renderItems(cardData);
})
.catch((err) => {
  console.log(err);
});
let userId;
//--------------------------------------------------------------------------------------------------------------
//Попап профиля
const userInfo = new UserInfo ({nameSelector: '.profile__name', descriptionSelector: '.profile__description', avatarSelector: '.profile__avatar'})
const handleProfileFormSubmit = (profileData) => {
  profilePopup.submitProcess(true);
  api.editProfile(profileData).then((result) => {
    userInfo.setUserInfo(result);
    profilePopup.close();
  }).finally(() => {
    profilePopup.submitProcess(false);
  })
};

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
const createCard = (cardData) => {
  const cardElement = new Card ({
    cardData: cardData,
    userId: userId,
    templateSelector: '#cards-template',
    handleCardClick,
    handleDeleteClick: (cardId, cards) => {
      deleteCardPopup.open(cardId, cards);
      deleteCardPopup.handleSubmitButtonClick((cardData) => {
        api.deleteCard(cardData.cardId).then(() =>{
          deleteCardPopup.close();
          cardElement.deleteCard();
        }).catch((err) => {
          console.log(err);
        });
      });
    },
    handleLikeClick: (cardData) => {
      if (!cardElement.isLiked()) {
        api.addLike(cardData.cardId).then((data) => {
          cardElement.countLikesAmount(data);
          cardElement.toggleLikeState();
        }).catch((err) => {console.log(err);
      });
    } else {
      api.removeLike(cardData.cardId).then((data) => {
        cardElement.countLikesAmount(data);
        cardElement.toggleLikeState();
      }).catch((err) => {console.log(err);
      })
    };
  },
});
return cardElement.generateCard(cardData);
}

const cardSection = new Section ({
  renderer: (cardData) => {
    cardSection.addItem(createCard(cardData))
  }
}, 
'.elements',
);
//----------------------------------------------------------------------------------------------------------------
//Попап добавления места
function handleCardFormSubmit(cardData) {
  placePopup.submitProcess(true)
  api.addCard({
    name: cardData.name,
    link: cardData.description}).then((result) => {
      cardSection.addItem(createCard(result), true);
      placePopup.close();
    })
    .finally(() => { placePopup.submitProcess(false)
  });
  };
console.log(userInfo)

const placePopup = new PopupWithForm('.popup_type_place', handleCardFormSubmit);
placePopup.setEventListeners();
//----------------------------------------------------------------------------------------------------------------
//Попап смены аватара
const handleAvatarFormSubmit = (data) => {
  console.log(data);
    api.editAvatar(data)
    .then((res) => {userInfo.setAvatarImg(res);
    avatarPopup.close();
    })
  }

const avatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);
avatarPopup.setEventListeners();
//----------------------------------------------------------------------------------------------------------------
// Попап удаления карточки

  const deleteCardPopup = new PopupWithConfirmation('.popup_type_delete');
  deleteCardPopup.setEventListeners();

//----------------------------------------------------------------------------------------------------------------
//Валидация
const profileFormValidator = new FormValidator(validationConfig, formProfile); 
const placeFormValidator = new FormValidator(validationConfig, formPlace);
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();
//----------------------------------------------------------------------------------------------------------------
//Открытие попапов

const handleAddCardButtonClick = (data) => {
  placePopup.open(data);
}

function handleEditProfileButtonClick(data) {
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = description;
  profileFormValidator.toggleButtonState()
  profilePopup.open(data);
}

const handleAvatarButtonClick = (data) => {
  avatarPopup.open(data);
}

addButton.addEventListener('click', handleAddCardButtonClick);
editButton.addEventListener('click', handleEditProfileButtonClick);
avatarEditBtn.addEventListener('click', handleAvatarButtonClick);



