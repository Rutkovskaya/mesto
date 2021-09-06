import '../pages/index.css';

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupTrash } from '../components/PopupTrash.js';
import { renderLoading } from '../utils/renderLoading.js';

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
const validationConfig = {
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: '.popup__text-error',
    errorClass: 'popup__text-error_active',
    sectionClass: '.form__section',
    inputNotValidClass: 'popup__text_not-valid'
}

//Информатор о пользователе
const userInfo = new UserInfo('.profile-info__name', '.profile-info__status', '.avatar');

let userId;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([user, data]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardsList.renderItems(data)
  })
  .catch((err) => {
    console.log(err)
  })

//Создаватор карточки
function createCard(data) {
    const card = new Card(
        data,
        userId,
        cardTemplate,
        {
            handleCardClick: (name, link) => {
                popupViewCard.open(name, link)
            },
            handleLikeClick: () => {
                const resultApi = card.likedCard() ? api.dislikeCard(card.getIdCard()) : api.likeCard(card.getIdCard());
                resultApi.then(data => {
                    card.setHart(data.likes);
                    card.renderHart()

                }).catch((err) => {
                    console.log(err);
                })
            },
            handleDeleteClick: () => {
                popupTrash.open(card)

            }
        }
    );

    const newCard = card.getCard();
    return newCard
}

//Добавлятор в большую коробку карточек
const cardsList = new Section({
    renderer: (data) => {
        const cardElement = createCard(data);
        cardsList.appendItem(cardElement);
    }
}, cardContainer);

api.getInitialCards()
    .then((data) => {
        cardsList.renderItems(data);
    })
    .catch((err) => {
        console.log(err);
    });

//Просмотр карточки
const popupViewCard = new PopupWithImage('.view-card');
popupViewCard.setEventListeners()

//Удалятор карточки
const popupTrash = new PopupTrash('.popup_trash', (e, card) => {
    handleDelete(e, card)
  })
  popupTrash.setEventListeners()

  const handleDelete = (e, card) => {
    e.preventDefault();
    api.deleteCard(card.getIdCard())
      .then(response => {
        card.deleteCard()
        popupTrash.close()
      })
      .catch((err) => {
      console.log(err);
    });
  }

//Добавлятор новой карточки
const popupWithFormAddCard = new PopupWithForm(
    '.popup_addcard',
    (data) => {
        renderLoading('.popup_addcard', true);
        api.addNewCard(data)
            .then((data) => {
                const cardElement = createCard(data);
                cardsList.prependItem(cardElement);
                popupWithFormAddCard.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() =>
            renderLoading('.popup_addcard', false))
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
        renderLoading('.popup_profile', true);
        api.editUserInfo(data)
            .then((res) => {
                userInfo.setUserInfo(res)
                popupWithFormProfile.close()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() =>
            renderLoading('.popup_profile', false))
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
        renderLoading('.popup_avatar', true);
        api.editAvatar(data.avatarLink)
            .then((res) => {
                userInfo.setUserInfo(res);
                popupWithFormAvatar.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() =>
            renderLoading('.popup_avatar', false))
    }
)

avatarButton.addEventListener('click', function () {
    popupWithFormAvatar.open();
})

popupWithFormAvatar.setEventListeners();

//Включатор валидации
const validatorProfile = new FormValidator(document.querySelector('.form_profile'), validationConfig);
validatorProfile.enableValidation()

const validatorAdd = new FormValidator(document.querySelector('.form_add'), validationConfig);
validatorAdd.enableValidation()

const formAvatarValidation = new FormValidator(document.querySelector('.form_ava'), validationConfig);
formAvatarValidation.enableValidation();
