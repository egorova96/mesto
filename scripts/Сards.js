import {openPopup, imagePopup, openPopupImage, openPopupText} from './index.js';

class Card {
  constructor(cardData, openPopup) {
    this._name = cardData.name;
    this._link = cardData.link; 
    this._templateSelector = '#cards-template';
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);

     return  cardTemplate;
  }

  generateCard() {
      // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    // Добавим данные
    this._element.querySelector('.elements__pic').src = this._link;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._element.querySelector('.elements__pic').alt = this._name;
    this._setEventListeners()
    // Вернём элемент наружу
    return this._element;
  } 

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.elements__pic').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    
    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._deleteCard();
    })
  }

  _handleLikeClick() {
    this._element.querySelector(".elements__like").classList.toggle("elements__like_active");
  };

  
  _handleOpenPopup() {
    openPopupImage.src = this._link;
    openPopupImage.alt = this._name;
    openPopupText.textContent = this._name;
    openPopup(imagePopup);
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
};

export {Card}
