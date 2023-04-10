export default class Api {
    constructor({ mainUrl, headers }) {
      this._mainUrl = mainUrl;
      this._headers = headers;
    }
    _getAnswer(result) {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  
    getInitialCards() {
        return fetch(`${this._mainUrl}cards`, 
        { method: 'GET',
          headers: this._headers,
         })
         .then(this._getAnswer);
    }
     
    setUserInfo() {
      return fetch(`${this._mainUrl}users/me`, { 
        method: 'GET',
        headers: this._headers,
      })
      .then(this._getAnswer);
    }
          
    editProfile(profileData) {
      return fetch(`${this._mainUrl}users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
        name: profileData.name,
        about: profileData.description,
        }),
      }).then(this._getAnswer);
    }
          
    addCard(data) {
        return fetch(`${this._mainUrl}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        }).then(this._getAnswer);
    }

    editAvatar(data) {
        return fetch(`${this._mainUrl}users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar: data.avatar,
          }),
        }).then(this._getAnswer);
      }

      deleteCard(cardId) {
        return fetch(`${this._mainUrl}cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
        }).then(this._getAnswer);
      }
    
      addLike(cardId) {
        return fetch(`${this._mainUrl}cards/${cardId}/likes`, {
          method: "PUT",
          headers: this._headers,
        }).then(this._getAnswer);
      }
    
      removeLike(cardId) {
        return fetch(`${this._mainUrl}cards/${cardId}/likes`, {
          method: "DELETE",
          headers: this._headers,
        }).then(this._getAnswer);
      }
    }



    