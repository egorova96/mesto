class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link; 
    this._templateSelector = document.querySelector('#cards-template');
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = this._templateSelector
      .content.querySelector('.elements__item')
      .cloneNode(true);

     return  cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__pic');
    this._likeButton = this._element.querySelector('.elements__like');
    this._cardTitle = this._element.querySelector('.elements__name');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  } 

  _handleCardClick() {
    this._handleCardClick({name: this._name, link: this._link});
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardImage.addEventListener('click', (evt) => {
      this._handleCardClick();
    });
    
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    })
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("elements__like_active");
  };

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
};

export {Card}

