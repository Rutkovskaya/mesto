//Показывалка ошибок
const showInputError = (inputElement, errorMassage, sectionClass, inputErrorClass, errorClass, inputNotValidClass) => {
  const formSectionElement = inputElement.closest(sectionClass);
  const errorElement = formSectionElement.querySelector(inputErrorClass);
  errorElement.textContent = errorMassage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputNotValidClass);
}

//Скрывалка ошибок
const hideInputError = (inputElement, sectionClass, inputErrorClass, errorClass, inputNotValidClass) => {
  const formSectionElement = inputElement.closest(sectionClass);
  const errorElement = formSectionElement.querySelector(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.add(errorClass);
  inputElement.classList.remove(inputNotValidClass);
}

//Определятор запуска функции показывать или нет ошибку
const checkInputValidity = (inputElement, inputNotValidClass, sectionClass, inputErrorClass, errorClass) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMassage = inputElement.validationMessage;
    showInputError(inputElement, errorMassage, sectionClass, inputErrorClass, errorClass, inputNotValidClass);
    //inputElement.classList.add(inputNotValidClass);
  } else {

    hideInputError(inputElement, sectionClass, inputErrorClass, errorClass, inputNotValidClass);
    //inputElement.classList.remove(inputNotValidClass);
  }
}

//Переключаем состояние кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

  if (hasNotValidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, sectionClass, inputNotValidClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(el => {
    setEventListeners(el, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, sectionClass, inputNotValidClass)
  })
};


//Отменяем стандартную отправку по субмиту
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, sectionClass, inputNotValidClass) => {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  //Получаем все поля формы
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  //Ищем кнопку
  const buttonElement = formElement.querySelector(submitButtonSelector);

  //При каждом нажатии кнопки на клаве запускаем проверку ошибки
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      checkInputValidity(inputElement, inputNotValidClass, sectionClass, inputErrorClass, errorClass);

      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    })
  })
}


enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: '.popup__text-error',
  errorClass: 'popup__text-error_active',
  sectionClass: '.form__section',
  inputNotValidClass: 'popup__text_not-valid',
});