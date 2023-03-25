// import {openPopup, imagePopup, imagePopupCard, textPopupCard} from './index.js';

class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link; 
    this._templateSelector = '#cards-template';
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);

     return  cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__pic').src = this._link;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._element.querySelector('.elements__pic').alt = this._name;
    this._setEventListeners()
    return this._element;
  } 

  _handleCardClick() {
    this._handleCardClick({name: this._name, link: this._link});
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.elements__pic').addEventListener('click', (evt) => {
      this._handleCardClick();
    });
    
    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._deleteCard();
    })
  }

  _handleLikeClick() {
    this._element.querySelector(".elements__like").classList.toggle("elements__like_active");
  };

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
};

export {Card}
