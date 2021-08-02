import { openPopup } from './index.js'
import { viewCard } from './index.js'

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

        this._setEventListeners();

        return this._newCard;
    }

    _setEventListeners() {
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
            openPopup(viewCard);
            const _viewImage = document.querySelector('.view-card__image');
            const _viewHeading = document.querySelector('.view-card__heading');
            _viewImage.src = this._selectCard.src;
            _viewImage.alt = this._selectCard.alt;
            _viewHeading.textContent = this._cardText.textContent;
        });
    }
}

export { Card }