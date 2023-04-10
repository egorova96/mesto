class Card {
  constructor({cardData, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._name = cardData.name;
    this._link = cardData.link; 
    this._templateSelector = document.querySelector('#cards-template');
    this._handleCardClick = handleCardClick;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._userId = userId;
    this._ownerId = cardData.owner._id;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._cardTitle = this._element.querySelector('.elements__name');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._likesCounter = this._element.querySelector('.elements__likes-counter');
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._likesCounter.textContent = this._likes.length;
    this.checkUserId();
    this._setEventListeners();
    this.checkLikeState();

    return this._element;
  } 


  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick({cardId: this._cardId});
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
    
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick({cardId: this._cardId});
    })
  }
//Проверить ID для удаления карточки
  checkUserId() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
      //console.log(this._ownerId, this._userId)
    }
  }
// Удалить карточку 
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
//Проверить лайк на карточке
  isLiked() {
    return this._likes.some((element) => element._id === this._userId);
  }

  checkLikeState = () => {
    if (this.isLiked()){
      this._likeButton.classList.add('elements__like-button_active');
    };
  }

  toggleLikeState() {
    this._likesCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add('elements__like-button_active');
    } else {
      this._likeButton.classList.remove('elements__like-button_active');
    }
  }

  countLikesAmount(data) {
    this._likes = data.likes;
  }

};

export {Card}

