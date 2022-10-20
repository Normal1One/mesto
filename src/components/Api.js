export class Api {
  constructor(options) {
    this._options = options;
  }

  getProfileInfo() {
    return this._request(`${this._options.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._options.headers,
    })
  }

  changeProfilePhoto(link) {
    return this._request(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
  }

  changeProfileInfo(name, about) {
    return this._request(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  createCard(name, link) {
    return this._request(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
  }

  likeImage(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._options.headers,
    })
  }

  unlikeImage(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
  }

  getInitialCards() {
    return this._request(`${this._options.baseUrl}/cards`, {
      method: 'GET',
      headers: this._options.headers,
    })
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}
