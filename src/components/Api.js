class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl
        this._headers = headers
    }

    _checkError(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`)
        }

        return res.json()
    }

    //Загрузка информации о пользователе с сервера
    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        })
            .then(this._checkError);
    }

    //Загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        })
            .then(this._checkError)
    }

    //Редактирование профиля
    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._checkError)
    }

    //Добавление новой карточки
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkError)
    }

    //Удаление карточки
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkError);
    }
    //Постановка и снятие лайка
    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        }).then(this._checkError)
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkError)
    }

    //Обновление аватара пользователя
    editAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(this._checkError);
    }

}

export { Api }