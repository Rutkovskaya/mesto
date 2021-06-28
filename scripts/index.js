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

    //удалятор карточек
    cardRemoveButton.addEventListener('click', function (e) {
        e.target.closest('.card').remove();
    });

    //лайкатор карточек
    hartButton.addEventListener('click', () => {
        hartButton.classList.toggle('hart-button_activ');
    });

//function popaupOpened(el){

//}


    //открыватор карточки
    function view() {
        viewCard.classList.add('popup_opened');
        viewImage.src = selectCard.src;
        viewImage.alt = selectCard.alt;
        viewHeading.textContent = cardText.textContent;
    }

    selectCard.addEventListener('click', view);

    //закрыватор карточки
    function closeCard() {
        viewCard.classList.remove('popup_opened');
    }

    closeViewCard.addEventListener('click', closeCard);

    return newCard;
}

initialCards.forEach(function (el) {
    cardContainer.append(createCard(el.name, el.link));
});

//Открытие попапа
function addCard() {
    сard.classList.add('popup_opened');
}

addButton.addEventListener('click', addCard);

//Закрытие попапа
function closeAddCard() {
    сard.classList.remove('popup_opened');
}

addcardCloseButton.addEventListener('click', closeAddCard);

//Согласование формы
function cardSubmitHandler(evt) {
    evt.preventDefault();

    const placeValue = placeInput.value;
    const urlValue = urlInput.value;
    cardContainer.prepend(createCard(placeValue, urlValue));

    closeAddCard()
}

formElementAdd.addEventListener('submit', cardSubmitHandler);


function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', nameProfile.textContent);
    jobInput.setAttribute('value', jobProfile.textContent);
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup()
}

formElement.addEventListener('submit', formSubmitHandler);