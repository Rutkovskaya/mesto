import { openPopup } from './index.js'

class Card {
    _name
    _link
    _template

    constructor(name, link, template) {
        this._name = name
        this._link = link
        this._template = template
    }

    getCard() {
        //Делатель карточек
        this._newCard = this._template.content.querySelector('.card').cloneNode(true);
        this._cardText = this._newCard.querySelector('.card__text');
        this._selectCard = this._newCard.querySelector('.card__image');
        this._cardRemoveButton = this._newCard.querySelector('.trash-button');
        this._hartButton = this._newCard.querySelector('.hart-button');

        this._cardText.textContent = this._name;
        this._selectCard.src = this._link;
        this._selectCard.alt = this._name;

        this._EventListener();

        return this._newCard;
    }

    _EventListener() {
        //Удалятор карточек
        this._cardRemoveButton.addEventListener('click', function (e) {
            e.target.closest('.card').remove();
        });

        //Лайкатор карточек
        this._hartButton.addEventListener('click', () => {
            this._hartButton.classList.toggle('hart-button_activ');
        });

        //Открыватор карточки
        this._selectCard.addEventListener('click', () => {
            this._viewImage = this.document.querySelector('.view-card__image');
            this._viewHeading = this.document.querySelector('.view-card__heading');
            openPopup(viewCard);
            this._viewImage.src = this.selectCard.src;
            this._viewImage.alt = this.selectCard.alt;
            this._viewHeading.textContent = this.cardText.textContent;
        });
    }
}

export { Card }