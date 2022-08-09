class Api {
  constructor ({baseUrl,headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getInitialCards () {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this.checkResponse(res))
  }
  
  getUserInfo () {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this.checkResponse(res))
  }
  
  updateUserInfo (name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'about': about
      })
    })
      .then(res => this.checkResponse(res))
  }
  
  updateUserAvatar (avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        'avatar': avatar,
      })
    })
      .then(res => this.checkResponse(res))
  }
  
  createCard (name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'link': link
      })
    })
      .then(res => this.checkResponse(res))
  }
  
  likeCard (cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId} `, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this.checkResponse(res))
  }
  
  dislikeCard (cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId} `, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this.checkResponse(res))
  }
  
  deleteCard (cardId)  {
    return fetch(`${this._baseUrl}/cards/${cardId} `, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this.checkResponse(res))
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '40932e94-b782-4b92-ae2b-c3ef3a68c705',
    'Content-Type': 'application/json'
  }
})

