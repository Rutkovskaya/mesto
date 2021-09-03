import '../pages/index.css';

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const editButton = document.querySelector('.profile-info__edit-button');
const avatarButton = document.querySelector('.avatar');
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





//Инфа о пользователе
const userInfo = new UserInfo('.profile-info__name', '.profile-info__status', '.avatar');

let userId;

api.getProfile().then(
    (data => {
        userId = data._id;
        userInfo.setUserInfo(data);       
    })
)
    .catch((err) => {
        console.log(err);
    })





//Создаватор карточки
function createCard(data) {
    const card = new Card(data, userId, cardTemplate, { handleCardClick, handleLikeClick, handleDeleteClick });
    const newCard = card.getCard();
    card.markUserLikes(newCard);
    card.updateLikes(newCard);

    return newCard
}

function handleCardClick(card) {
    popupViewCard.open(card);
}
function handleLikeClick(cardId, isLiked) {
    return api.likeCard(cardId, isLiked)
}
function handleDeleteClick(card) {
    const popupTrash = document.querySelector('.popup_trash');
    popupTrash.card = card;
    popupTrash.open()
    //card.target.closest('.card').remove();
}



const cardsList = new Section({
    renderer: (data) => {
        const cardElement = createCard(data);
        cardsList.addItem(cardElement);
    }
}, cardContainer);

const popupViewCard = new PopupWithImage('.view-card');
popupViewCard.setEventListeners()





//Пока ломалка
function loading(popupSelector, loading) {
    const submitButton = popupSelector.querySelector('.popup__submit-btn');
    if (loading) {
        submitButton.textContent = 'Сохранение...'
    }
    else {
        submitButton.textContent = 'Сохранить'
    }
}

//Добавлятор массива карточек
api.getInitialCards()
    .then((data) => {
        cardsList.renderItems(data);
    })
    .catch((err) => {
        console.log(err);
    });





//Открыватор и добавление новой карточки
const popupWithFormAddCard = new PopupWithForm(
    '.popup_addcard',
    (data) => {
        //loading('.popup_addcard', true);
        api.addNewCard(data)
            .then((data) => {
                const cardElement = createCard(data);
                cardsList.addItem(cardElement);
            })
            .catch((err) => {
                console.log(err);
            })
        //  .finally(() =>
        //   loading('.popup_addcard', false))
    }
)

popupWithFormAddCard.setEventListeners();

addButton.addEventListener('click', () => {
    popupWithFormAddCard.open();
    validatorAdd.resetValidation()
});










//Редактирование профиля
const popupWithFormProfile = new PopupWithForm(
    '.popup_profile',
    (data) => {
        api.editUserInfo(data)
            .then((res) => {
                userInfo.setUserInfo(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
)

popupWithFormProfile.setEventListeners();

editButton.addEventListener('click', function () {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    popupWithFormProfile.open();
})




//Редактирование аватара
const popupWithFormAvatar = new PopupWithForm(
    '.popup_avatar',
    (data) => {
        api.editAvatar(data.avatarLink)
            .then((res) => {
                userInfo.setUserInfo(res);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
)

avatarButton.addEventListener('click', function () {
    popupWithFormAvatar.open();
})

popupWithFormAvatar.setEventListeners();











//Включение валидации
const validatorProfile = new FormValidator(document.querySelector('.form_profile'), selector);
validatorProfile.enableValidation()

const validatorAdd = new FormValidator(document.querySelector('.form_add'), selector);
validatorAdd.enableValidation()

const formAvatarValidation = new FormValidator(document.querySelector('.form_аvatar'), selector);
formAvatarValidation.enableValidation();

export { handleCardClick }