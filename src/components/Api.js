export class Api {
  constructor(options) {
    this._options = options;
  }

  getProfileInfo() {
    return this._request(`users/me`, {
      method: 'GET',
    })
  }

  changeProfilePhoto(link) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link
      })
    })
  }

  changeProfileInfo(name, about) {
    return this._request(`users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  createCard(name, link) {
    return this._request(`cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, {
      method: 'DELETE',
    })
  }

  likeImage(id) {
    return this._request(`cards/${id}/likes`, {
      method: 'PUT',
    })
  }

  unlikeImage(id) {
    return this._request(`cards/${id}/likes`, {
      method: 'DELETE',
    })
  }

  getInitialCards() {
    return this._request(`cards`, {
      method: 'GET',
    })
  }

  _request(url, options) {
    options['headers'] = this._options.headers;
    return fetch(`${this._options.baseUrl}/${url}`, options).then(this._checkResponse);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}
