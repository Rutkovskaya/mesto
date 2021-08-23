import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { PopupWithImage } from './PopupWithImage.js'
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const profilePopup = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile-info__edit-button');
const nameProfile = document.querySelector('.profile-info__name');
const jobProfile = document.querySelector('.profile-info__status');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_status');
const addButton = document.querySelector('.add-button');
const сard = document.querySelector('.popup_addcard');
const cardContainer = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.card-template');
const viewCard = document.querySelector('.view-card');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Открыватор карточки
function handleCardClick(name, link) {
    const popupViewCard = new PopupWithImage(viewCard);
    popupViewCard.open(name, link);
}

//Создаватор карточки
function createCard(name, link) {
    const card = new Card(name, link, cardTemplate, handleCardClick);
    const newCard = card.getCard();
    return newCard
}

//Добавлятор массива карточек
const cardsList = new Section({
    items: initialCards,
    renderer: (items) => {
        const cardElement = createCard(items.name, items.link);
        cardsList.addItem(cardElement);
    }
}, cardContainer);
cardsList.rendererItem();


//Открыватор добавление новой карточки
addButton.addEventListener('click', () => {
    popupWithFormAddCard.open()
});

const popupWithFormAddCard = new PopupWithForm({
    popupSelector: сard,
    handleFormSubmit: (items) => {
        const cardElement = createCard(items.name, items.link);
        cardsList.addItem(cardElement);
    }
})

//Инфа о пользователе
const userInfo = new UserInfo(nameProfile, jobProfile);

//Открыватор редактирования профиля
editButton.addEventListener('click', function () {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.nameProfile;
    jobInput.value = userData.jobProfile;
    popupWithFormProfile.open();
})

const popupWithFormProfile = new PopupWithForm({
    popupSelector: profilePopup,
    handleFormSubmit: (data) => {
        setUserInfo(data.name, data.job)
    }
})

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

//Включение валидации
const validatorProfile = new FormValidator(document.querySelector('.form_profile'), selector);
validatorProfile.enableValidation()

const validatorAdd = new FormValidator(document.querySelector('.form_add'), selector);
validatorAdd.enableValidation()

export { handleCardClick }