export default class Api {
  constructor() {
    this._url = 'https://mesto.nomoreparties.co/v1/cohort-20';
  }

  _makeRequest({
    action,
    method = 'GET',
    data = null,
  }) {
    if (!action) {
      return Promise.reject('Не передано адреса запроса');
    }

    const requestParams = {
      method,
      headers: {
        authorization: 'ae67ccb6-ec53-41ab-bfce-d685e4f66069',
      },
    };

    let url = this._url + action;

    if (data) {
      if (method === 'GET') {
        url += new URLSearchParams(data).toString();
      } else {
        requestParams.body = JSON.stringify(data);
        requestParams.headers['Content-Type'] = 'application/json';
      }
    }

    return fetch(url, requestParams);
  }

  _getJsonFromResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`)
    }

    return response.json();
  }

  _getOkStatusFromResponse(response) {
    return response.ok;
  }

  getAuthorizedUserInfo() {
    return this._makeRequest({
      action: '/users/me'
    }).then(this._getJsonFromResponse);
  }

  getCards() {
    return this._makeRequest({
      action: '/cards',
    }).then(this._getJsonFromResponse);
  }

  updateProfile({name, about}) {
    return this._makeRequest({
      action: '/users/me',
      method: 'PATCH',
      data: {name, about},
    }).then(this._getJsonFromResponse);
  }

  addCard({name, link}) {
    return this._makeRequest({
      action: '/cards',
      method: 'POST',
      data: {name, link},
    }).then(this._getJsonFromResponse);
  }

  removeCard(cardId) {
    return this._makeRequest({
      action: `/cards/${cardId}`,
      method: 'DELETE',
    }).then(this._getOkStatusFromResponse);
  }
}
