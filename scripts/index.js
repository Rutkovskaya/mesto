let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile-info__edit-button');
let closeButton = document.querySelector('.popup__close-btn');
let submitButton = document.querySelector('.popup__submit-btn');

function openPopup() {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

let nameProfile = document.querySelector('.profile-info__name');
let jobProfile = document.querySelector('.profile-info__status');
let nameInput = document.querySelector('.input__text_type_name');
let jobInput = document.querySelector('.input__text_type_status');

nameInput.setAttribute('value', nameProfile.textContent);
jobInput.setAttribute('value', jobProfile.textContent);

let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);




