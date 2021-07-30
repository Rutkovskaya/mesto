import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const profilePopup = document.querySelector('.popup_profile');
const editButton = document.querySelector('.profile-info__edit-button');
const closeButton = document.querySelector('.popup__close-btn_profile');
const nameProfile = document.querySelector('.profile-info__name');
const jobProfile = document.querySelector('.profile-info__status');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_status');
const formElement = document.querySelector('.form');
const addButton = document.querySelector('.add-button');
const сard = document.querySelector('.popup_addcard');
const addCardCloseButton = document.querySelector('.popup__close-btn_addcard');
const placeInput = document.querySelector('.popup__text_type_place');
const urlInput = document.querySelector('.popup__text_type_url');
const cardContainer = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.card-template');
const formElementAdd = document.querySelector('.form_add');
const viewCard = document.querySelector('.view-card');
const closeViewCard = document.querySelector('.popup__close-btn_view');
//const viewImage = document.querySelector('.view-card__image');
//const viewHeading = document.querySelector('.view-card__heading');

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
        if (evt.target.closest === evt.currentTarget) {
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

//Рендрим карточку
/*function createCard(name, link) {
    const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardText = newCard.querySelector('.card__text');
    const selectCard = newCard.querySelector('.card__image');
    const cardRemoveButton = newCard.querySelector('.trash-button');
    const hartButton = newCard.querySelector('.hart-button');

    cardText.textContent = name;
    selectCard.src = link;
    selectCard.alt = name;

    //Удалятор карточек
    cardRemoveButton.addEventListener('click', function (e) {
        e.target.closest('.card').remove();
    });

    //Лайкатор карточек
    hartButton.addEventListener('click', () => {
        hartButton.classList.toggle('hart-button_activ');
    });

    //Открыватор карточки
    selectCard.addEventListener('click', () => {
        openPopup(viewCard);
        viewImage.src = selectCard.src;
        viewImage.alt = selectCard.alt;
        viewHeading.textContent = cardText.textContent;
    });

    return newCard;
}*/

//Функция согласования формы (добавляем карточку)
function cardSubmitHandler(evt) {
    evt.preventDefault();

    const placeValue = placeInput.value;
    const urlValue = urlInput.value;

    const card = new Card(placeValue, urlValue, cardTemplate);
    cardContainer.prepend(card.getCard())

    evt.target.reset();

    const addCardSubmit = сard.querySelector('.popup__submit-btn_addcard');
    addCardSubmit.setAttribute("disabled", true);
    addCardSubmit.classList.add("popup__submit-btn_inactive");

    closePopup(сard);
}

//Функция согласования формы (редактирование профиля)
function formSubmitHandler(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(profilePopup);
}

//Закрыватор карточки
closeViewCard.addEventListener('click', () => closePopup(viewCard));
closeByOverlay(viewCard);

//Открыватор добавление карточки
addButton.addEventListener('click', () => openPopup(сard));

//Закрыватор добавления карточки
addCardCloseButton.addEventListener('click', () => closePopup(сard));
closeByOverlay(сard);

//Согласование формы (добавляем карточку)
formElementAdd.addEventListener('submit', cardSubmitHandler);

//Открыватор редактирования профиля
editButton.addEventListener('click', () => {
    openPopup(profilePopup);
    nameInput.setAttribute('value', nameProfile.textContent);
    jobInput.setAttribute('value', jobProfile.textContent);
});

//Закрыватор редактирования профиля
closeButton.addEventListener('click', () => closePopup(profilePopup));
closeByOverlay(profilePopup);

//Согласование формы (редактирование профиля)
formElement.addEventListener('submit', formSubmitHandler);

//Добавляем карточки
initialCards.forEach(function (el) {
    const card = new Card(el.name, el.link, cardTemplate)
    cardContainer.append(card.getCard())
});

export { openPopup }

//СПАСИБО =)