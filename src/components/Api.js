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

    //1. Загрузка информации о пользователе с сервера (выполнено)
    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        })
            .then(this._checkError);
    }

    //2. Загрузка карточек с сервера (выполнено)
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        })
            .then(this._checkError)
    }

    //3. Редактирование профиля (выполнено)
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

    //4. Добавление новой карточки (выполнено)
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

    //5. Отображение количества лайков карточки

    //6. Попап удаления карточки

    //7. Удаление карточки
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
        })
          .then(this._checkError);
      }
    //8. Постановка и снятие лайка
    likeCard(cardId, isLiked) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
          method: isLiked ? "DELETE" : "PUT",
          headers: this._headers,
        })
          .then(this._checkError);
      }

    //9. Обновление аватара пользователя
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

    //10. Улучшенный UX всех форм


}

export { Api }