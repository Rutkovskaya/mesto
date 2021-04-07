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

let popup = document.querySelector('.popup'); // Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.input__text_type_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.input__text_type_status');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

                                                 // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
    nameInput.getAttribute('placeholder');
    
    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
