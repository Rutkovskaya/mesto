let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile-info__edit-button');
let closeButton = document.querySelector('.popup__close-btn');
let nameProfile = document.querySelector('.profile-info__name');
let jobProfile = document.querySelector('.profile-info__status');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_status');
let formElement = document.querySelector('.popup__container');


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