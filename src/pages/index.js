import '../pages/index.css';

import { initialCards } from '../utils/constants.js';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const editButton = document.querySelector('.profile-info__edit-button');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_status');
const addButton = document.querySelector('.add-button');
const cardContainer = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.card-template');

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: '9db5a196-f915-4749-a277-679c835c6874',
        'Content-Type': 'application/json'
    }
});

//Настройка селекторов
const selector = {
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: '.popup__text-error',
    errorClass: 'popup__text-error_active',
    sectionClass: '.form__section',
    inputNotValidClass: 'popup__text_not-valid'
}

const popupViewCard = new PopupWithImage('.view-card');
popupViewCard.setEventListeners()

//Открыватор карточки
function handleCardClick(name, link) {
    popupViewCard.open(name, link);
}

//Создаватор карточки
function createCard({ name, link }) {
    const card = new Card({ name, link }, cardTemplate, handleCardClick);
    const newCard = card.getCard();
    return newCard
}

//Добавлятор массива карточек
api.getInitialCards()
    .then((data) => {
        const cardsList = new Section({
            items: data,
            renderer: ({ name, link }) => {
                const cardElement = createCard({ name, link });
                cardsList.addItem(cardElement);
            }
        }, cardContainer);
        cardsList.renderItems();
    })
    .catch((err) => {
        console.log(err);
    });


//Открыватор и добавление новой карточки
const popupWithFormAddCard = new PopupWithForm(
    '.popup_addcard',
    api.sendNewCard()
        .then(({ name, link }) => {
            const cardElement = createCard({ name, link });
            cardsList.addItem(cardElement);
        })
        .catch((err) => {
            console.log(err);
        })
)

popupWithFormAddCard.setEventListeners();

addButton.addEventListener('click', () => {
    popupWithFormAddCard.open();
    validatorAdd.resetValidation()
});

//Инфа о пользователе
const userInfo = new UserInfo('.profile-info__name', '.profile-info__status');

const popupWithFormProfile = new PopupWithForm(
    '.popup_profile',
    api.editUserInfo()
        .then(({ name, about }) => {
            userInfo.setUserInfo({ name, about });
        })
        .catch((err) => {
            console.log(err);
        })
)

popupWithFormProfile.setEventListeners();

//Открыватор редактирования профиля
editButton.addEventListener('click', function () {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    popupWithFormProfile.open();
    console.log(nameInput.value)
})

//Включение валидации
const validatorProfile = new FormValidator(document.querySelector('.form_profile'), selector);
validatorProfile.enableValidation()

const validatorAdd = new FormValidator(document.querySelector('.form_add'), selector);
validatorAdd.enableValidation()

export { handleCardClick }