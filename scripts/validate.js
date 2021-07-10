//Показывалка ошибок
const showInputError = (inputElement, errorMassage) => {
  console.log(inputElement.name, errorMassage);
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

const checkInputValidity = (inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMassage = inputElement.validationMessage;
    showInputError(inputElement, errorMassage);
  } else {
    hideInputError(inputElement);
  }
}

const setEventListeners = (formElement) => {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(".popup__text"));


  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      checkInputValidity(inputElement);

    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

  formList.forEach(setEventListeners);
};

enableValidation();