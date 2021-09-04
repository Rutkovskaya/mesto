class Card {

    constructor(data, userId, template, { handleCardClick, handleLikeClick, handleDeleteClick }) {
        this._name = data.name;
        this._link = data.link;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
        this._likes = data.likes;
        this._userId = userId;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    getCard() {
        //Делатель карточек
        this._newCard = this._template.content.querySelector('.card').cloneNode(true);
        this._cardText = this._newCard.querySelector('.card__text');
        this._selectCard = this._newCard.querySelector('.card__image');
        this._cardRemoveButton = this._newCard.querySelector('.trash-button');
        this._hartButton = this._newCard.querySelector('.hart-button');
        this._hartCounter = this._newCard.querySelector('.hart-counter');

        this._cardText.textContent = this._name;
        this._selectCard.src = this._link;
        this._selectCard.alt = this._name;

        this.renderHart();
        this._deletePossibility()
        this._setEventListeners();

        return this._newCard;
    }

    _setEventListeners() {
        //Удалятор карточек
        this._cardRemoveButton.addEventListener('click', () => {
            this._handleDeleteClick();
        });


        //Лайкатор карточек
        this._hartButton.addEventListener('click', () => {
            this._handleLikeClick();
        });

        //Открыватор карточки
        this._selectCard.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _deletePossibility() {
        if (this._ownerId !== this._userId) {
            this._cardRemoveButton.classList.add('trash-button_hidden')
        }
    }

    deleteCard() {
        this._newCard.remove();
    }

    getIdCard() {
        return this._cardId
    }

    likedCard() {
        return this._likes.some(like => {
            return like._id === this._userId
        })
    }

    _showHart() {
        if (this.likedCard(this._userId)) {
            this._hartButton.classList.add('hart-button_activ')
        } else {
            this._hartButton.classList.remove('hart-button_activ')
        }
    }

    setHart(list) {
        this._likes = list
    }

    renderHart() {
        this._hartCounter.textContent = this._likes.length
        this._showHart(this._userId)
    }

}
export { Card }