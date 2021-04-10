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
let jobProfilet = document.querySelector('.profile-info__status');

console.log(nameProfile.textContent);
console.log(jobProfilet.textContent);

// Находим поля формы в DOM
let nameInput = document.querySelector('.input__text_type_name');
let jobInput = document.querySelector('.input__text_type_status');

console.log(nameInput.getAttribute('value'));
console.log(jobInput.getAttribute('value'));

nameInput.setAttribute('value', nameProfile.textContent);
jobInput.setAttribute('value', jobProfilet.textContent);






