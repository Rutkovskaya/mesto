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

    //1. Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        })
            .then(this._checkError);
    }

    //2. Загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        })
            .then(this._checkError)
    }

    //3. Редактирование профиля
    editUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(this._checkError)
    }

    //4. Добавление новой карточки
    addNewCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkError)
    }

    //5. Отображение количества лайков карточки

    //6. Попап удаления карточки

    //7. Удаление карточки

    //8. Постановка и снятие лайка

    //9. Обновление аватара пользователя
    editAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar: avatarLink
          })
        })
          .then(this._checkResponse);
      }

    //10. Улучшенный UX всех форм


}

export { Api }