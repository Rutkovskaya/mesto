const showInputError = (inputElement, errorMassage) => {
  console.log(inputElement.name, errorMassage);
  const formSectionElement = inputElement.closest(".form__section");
  const errorElement = formSectionElement.querySelector(".popup__text-error");
  errorElement.textContent = errorMassage;
  errorElement.classList.add("form__input-error_active");
}

const hideInputError = (inputElement) => {

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
      console.log(event.target.name);
      checkInputValidity(inputElement);

    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

  formList.forEach(setEventListeners);
};

enableValidation();