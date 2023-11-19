class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Код ошибки ${res.status}`);
    }

    //user data receiving
    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              }
        }).then((res) => this._checkResponse(res));
    }

    // user data updating
    setInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.username,
                about: data.userdescription,
            })
          }).then((res) => this._checkResponse(res))
        }
    //avatar updating
    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                avatar: data.avatar,
            }),
            credentials: 'include',
        }).then((res)=>this._checkResponse(res));
    }

    //cards data receiving
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              },
        }).then((res) => this._checkResponse(res));
    }

    //new card adding
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: data.imagename,
                link: data.imagelink,
            }),
            credentials: 'include',
        }).then((res) => this._checkResponse(res))
    }

    //like adding
    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              },
        }).then((res) => this._checkResponse(res));
    }

    //like deleting
    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              },
        }).then((res) => this._checkResponse(res));
    }

    //card deleting
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              },
        }).then((res) => this._checkResponse(res));
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-72",
});

export default api;
