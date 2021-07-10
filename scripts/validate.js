//Показывалка ошибок
const showInputError = (inputElement, errorMassage) => {
  const formSectionElement = inputElement.closest(".form__section");
  const errorElement = formSectionElement.querySelector(".popup__text-error");
  errorElement.textContent = errorMassage;
  errorElement.classList.add("popup__text-error_active");
}

//Скрывалка ошибок
const hideInputError = (inputElement) => {
  const formSectionElement = inputElement.closest(".form__section");
  const errorElement = formSectionElement.querySelector(".popup__text-error");
  errorElement.textContent = "";
  errorElement.classList.add("popup__text-error_active");
}

//Определятор запуска функции показывать или нет ошибку
const checkInputValidity = (inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMassage = inputElement.validationMessage;
    showInputError(inputElement, errorMassage);
    inputElement.classList.add("popup__text_not-valid");
    console.log(inputElement);
  } else {
    hideInputError(inputElement);
    inputElement.classList.remove("popup__text_not-valid");
  }
}

//Переключаем состояние кнопки
const toggleButtonState = (inputList, buttonElement) => {
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

  if (hasNotValidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__submit-btn_inactive");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__submit-btn_inactive");
  }
};

//Отменяем стандартную отправку по субмиту
const setEventListeners = (formElement) => {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });

//Получаем все поля формы
  const inputList = Array.from(formElement.querySelectorAll(".popup__text"));

//Ищем кнопку
const buttonElement = formElement.querySelector(".popup__submit-btn");

//При каждом нажатии кнопки на клаве запускаем проверку ошибки
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      checkInputValidity(inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

  formList.forEach(setEventListeners);
};

enableValidation();