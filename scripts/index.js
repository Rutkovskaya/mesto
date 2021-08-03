import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const popups = document.querySelectorAll('.popup')
const profilePopup = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile-info__edit-button');
const nameProfile = document.querySelector('.profile-info__name');
const jobProfile = document.querySelector('.profile-info__status');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_status');
const formElement = document.querySelector('.form');
const addButton = document.querySelector('.add-button');
const сard = document.querySelector('.popup_addcard');
const placeInput = document.querySelector('.popup__text_type_place');
const urlInput = document.querySelector('.popup__text_type_url');
const cardContainer = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.card-template');
const formElementAdd = document.querySelector('.form_add');
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

//открыватор попапчиков
const openPopup = (el) => {
    el.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

//закрыватор попапчиков
const closePopup = (el) => {
    el.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape)
}

const closeByOverlay = (el) => {
    el.addEventListener('click', (evt => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(el);
        }
    }))
};

const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
};

//Создаем карточки
function createCard(name, link, template) {
    const card = new Card(name, link, template, handleCardClick)
    return card
}

//Функция согласования формы (добавляем карточку)
function cardSubmitHandler(evt) {
    evt.preventDefault();

    const placeValue = placeInput.value;
    const urlValue = urlInput.value;

    cardContainer.prepend(createCard(placeValue, urlValue, cardTemplate).getCard())

    evt.target.reset();

    validatorAdd.resetValidation();

    closePopup(сard);
}

//Функция согласования формы (редактирование профиля)
function formSubmitHandler(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(profilePopup);
}

//Открыватор карточки
function handleCardClick(name, link) {
    const _viewImage = document.querySelector('.view-card__image');
    const _viewHeading = document.querySelector('.view-card__heading');
    _viewImage.src = link;
    _viewImage.alt = name;
    _viewHeading.textContent = name;
    openPopup(viewCard);
}

//Магическое конгфу закрывания попапчиков
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-btn')) {
            closePopup(popup)
        }
    })
})

//Открыватор добавление карточки
addButton.addEventListener('click', () => openPopup(сard));

//Согласование формы (добавляем карточку)
formElementAdd.addEventListener('submit', cardSubmitHandler);

//Открыватор редактирования профиля
editButton.addEventListener('click', () => {
    openPopup(profilePopup);
    nameInput.setAttribute('value', nameProfile.textContent);
    jobInput.setAttribute('value', jobProfile.textContent);
});

//Согласование формы (редактирование профиля)
formElement.addEventListener('submit', formSubmitHandler);

//Добавляем карточки
initialCards.forEach(function (el) {
    cardContainer.append(createCard(el.name, el.link, cardTemplate).getCard())
});

const selector = {
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: '.popup__text-error',
    errorClass: 'popup__text-error_active',
    sectionClass: '.form__section',
    inputNotValidClass: 'popup__text_not-valid'
}

const validatorProfile = new FormValidator(document.querySelector('.form_profile'), selector);
validatorProfile.enableValidation()

const validatorAdd = new FormValidator(document.querySelector('.form_add'), selector);
validatorAdd.enableValidation()

export { handleCardClick }
export { viewCard }

//СПАСИБО =)