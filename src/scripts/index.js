import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { PopupWithImage } from './PopupWithImage.js'
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const editButton = document.querySelector('.profile-info__edit-button');
const nameProfile = document.querySelector('.profile-info__name');
const jobProfile = document.querySelector('.profile-info__status');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_status');
const addButton = document.querySelector('.add-button');
const cardContainer = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.card-template');

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
const cardsList = new Section({
    items: initialCards,
    renderer: ({ name, link }) => {
        const cardElement = createCard({ name, link });
        cardsList.addItem(cardElement);
    }
}, cardContainer);
cardsList.renderItems();


//Открыватор и добавление новой карточки
const popupWithFormAddCard = new PopupWithForm(
    '.popup_addcard',
    ({name, link}) => {
        const cardElement = createCard({name, link});
        cardsList.addItem(cardElement);
    }
)

popupWithFormAddCard.setEventListeners();

addButton.addEventListener('click', () => {
    popupWithFormAddCard.open()
});

//Инфа о пользователе
const userInfo = new UserInfo('.profile-info__name', '.profile-info__status');

const popupWithFormProfile = new PopupWithForm(
    '.popup_profile',
    (data) => {
        userInfo.setUserInfo(data.name, data.job)
    }
)

popupWithFormProfile.setEventListeners();

//Открыватор редактирования профиля
editButton.addEventListener('click', function () {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.nameProfile;
    jobInput.value = userData.jobProfile;
    popupWithFormProfile.open();
})

//Включение валидации
const validatorProfile = new FormValidator(document.querySelector('.form_profile'), selector);
validatorProfile.enableValidation()

const validatorAdd = new FormValidator(document.querySelector('.form_add'), selector);
validatorAdd.enableValidation()

export { handleCardClick }