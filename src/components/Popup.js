export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
    }
  
    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleCloseByEsc);
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleCloseByEsc);
    }
  
    setEventListeners() {
      this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.close();
        };
        if (evt.target.classList.contains('popup__close-button')) {
          this.close();
        }
      });
    }

    _handleCloseByEsc = (evt) => {
      if (evt.key === 'Escape'){
        this.close(this._popup);
      }
    }
  }