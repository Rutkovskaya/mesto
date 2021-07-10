const showInputError = (inputElement, errorMassage) => {
  console.log(inputElement.name, errorMassage);
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

  console.log(inputList)

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