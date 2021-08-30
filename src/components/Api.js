class Api {
    constructor(options) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }


    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    editUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    sendNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }






    /*likeCard(cardId, isLiked) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
          method: isLiked ? "DELETE" : "PUT",
          headers: this._headers,
        })
          .then(this._checkResponse);
      }*/


}