const imagePopup = document.querySelector(".popup_type_image");
const openPopupImage = imagePopup.querySelector('.popup__card');
const openPopupText = imagePopup.querySelector('.popup__text')

class Card {
  constructor(massiveData) {
    this._name = massiveData.name;
    this._link = massiveData.link; 
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
    openPopupText.textContent = this._name
    imagePopup.classList.add('popup_opened');
  }

  _handleClosePopup() {
    openPopupImage.src = '';
    openPopupText.textContent = '';
    imagePopup.classList.remove('popup_opened');
  }

  _deleteCard() {
    this._element.closest(".elements__item").remove();
  }
};

export {Card}
