import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { Popup } from './Popup.js'
import { PopupWithImage } from './PopupWithImage.js'
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

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

//Создаем карточки
function createCard(items, template) {
    const card = new Card(items, template, handleCardClick);
    card.getCard();
    return card
}

const cardsList = new Section({
    items: initialCards,
    renderer: (items) => {
        const cardElement = createCard(items, cardTemplate);
        cardsList.addItem(cardElement);
    }
}, cardContainer);
cardsList.rendererItem();


//Добавляем карточки
/*initialCards.forEach(function (el) {
    cardContainer.append(createCard(el.name, el.link, cardTemplate).getCard())
});*/


//Открыватор карточки
function handleCardClick(name, link) {
    const popupViewCard = new PopupWithImage(viewCard);
    popupViewCard.open(name, link);

    console.log(name);
    console.log(link);
}

//Открыватор добавление карточки
addButton.addEventListener('click', () => {
    popupWithFormAddCard.open()
});


const popupWithFormAddCard = new PopupWithForm({
    popupSelector: сard,

    handleFormSubmit: (name, link) => {
        const cardElement = createCard(name, link, cardTemplate);
        cardsList.addItem(cardElement);

        console.log(name);
        console.log(link);
    }
})


//Функция согласования формы (добавляем карточку)
//function cardSubmitHandler(evt) {

/* evt.preventDefault();

 const placeValue = placeInput.value;
 const urlValue = urlInput.value;

 cardContainer.prepend(createCard(placeValue, urlValue, cardTemplate).getCard())

 evt.target.reset();

 validatorAdd.resetValidation();

popupCard.close()
}*/

//Функция согласования формы (редактирование профиля)
function formSubmitHandler(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;


    const popupProfile = new Popup(profilePopup);
    popupProfile.close()
}

//Согласование формы (добавляем карточку)
//formElementAdd.addEventListener('submit', cardSubmitHandler);

//Открыватор редактирования профиля
editButton.addEventListener('click', () => {
    const popupProfile = new Popup(profilePopup);
    popupProfile.open();
    nameInput.setAttribute('value', nameProfile.textContent);
    jobInput.setAttribute('value', jobProfile.textContent);
});

//Согласование формы (редактирование профиля)
formElement.addEventListener('submit', formSubmitHandler);

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