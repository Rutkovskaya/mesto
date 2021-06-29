const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile-info__edit-button');
const closeButton = document.querySelector('.popup__close-btn_profile');
const nameProfile = document.querySelector('.profile-info__name');
const jobProfile = document.querySelector('.profile-info__status');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_status');
const formElement = document.querySelector('.form');
const addButton = document.querySelector('.add-button');
const сard = document.querySelector('.addcard');
const addcardCloseButton = document.querySelector('.popup__close-btn_addcard');
const placeInput = document.querySelector('.popup__text_type_place');
const urlInput = document.querySelector('.popup__text_type_url');
const cardContainer = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.card-template');
const formElementAdd = document.querySelector('.form_add');
const viewCard = document.querySelector('.view-card');
const closeViewCard = document.querySelector('.popup__close-btn_view');
const viewImage = document.querySelector('.view-card__image');
const viewHeading = document.querySelector('.view-card__heading');

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
function popupOpened(el) {
    el.classList.add('popup_opened');
}

//закрыватор попапчиков
function popupСlose(el) {
    el.classList.remove('popup_opened');
}

//Рендрим карточку
function createCard(name, link) {
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
        popupOpened(viewCard);
        viewImage.src = selectCard.src;
        viewImage.alt = selectCard.alt;
        viewHeading.textContent = cardText.textContent;
    });

    return newCard;
}

//Функция согласования формы (добавляем карточку)
function cardSubmitHandler(evt) {
    evt.preventDefault();

    const placeValue = placeInput.value;
    const urlValue = urlInput.value;
    cardContainer.prepend(createCard(placeValue, urlValue));

    popupСlose(сard);
}

//Функция согласования формы (редактирование профиля)
function formSubmitHandler(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    popupСlose(popup);
}

//Закрыватор карточки
closeViewCard.addEventListener('click', () => popupСlose(viewCard));

//Открыватор добавление карточки
addButton.addEventListener('click', () => popupOpened(сard));

//Закрыватор добавления карточки
addcardCloseButton.addEventListener('click', () => popupСlose(сard));

//Согласование формы (добавляем карточку)
formElementAdd.addEventListener('submit', cardSubmitHandler);

//Открыватор редактирования профиля
editButton.addEventListener('click', () => {
    popupOpened(popup);
    nameInput.setAttribute('value', nameProfile.textContent);
    jobInput.setAttribute('value', jobProfile.textContent);
});

//Закрыватор редактирования профиля
closeButton.addEventListener('click', () => popupСlose(popup));

//Согласование формы (редактирование профиля)
formElement.addEventListener('submit', formSubmitHandler);

//Добавляем карточки
initialCards.forEach(function (el) {
    cardContainer.append(createCard(el.name, el.link));
});

//СПАСИБО =)