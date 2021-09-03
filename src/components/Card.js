class Card {

    constructor(data, userId, template, {handleCardClick, handleLikeClick, handleDeleteClick}) {
        this._name = data.name;
        this._link = data.link;
        this._ownerId = data.owner.id;
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

        this._deletePossibility();
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
            console.log("Лайкатор карточки работает");
            
            this._handleLikeClick(this._cardId, this.isLiked)
                .then((data) => {
                    this._hartButton.classList.toggle('hart-button_activ');
                    this.isLiked = !this.isLiked;
                    this._hartCounter.textContent = data.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        });

        //Открыватор карточки
        this._selectCard.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _deletePossibility() {
        if (this._userId !== this._ownerId) {
            this._cardRemoveButton.classList.add('.trash-button_hidden')
        }
        else {
            this._cardRemoveButton.classList.remove('.trash-button_hidden')
        }
    }

    deleteCard() {
        //card.target.closest('.card').remove();
        this._element.remove();
        this._element = null;
    }

    iLike(card) {
        if (this._likes.some(person => person._id === this._userId)) {
            this._hartButton.classList.add('hart-button_activ');
        }
    }

    updateLikes(card) {
        this._hartCounter.textContent = this._likes.length;
    }
}
export { Card }