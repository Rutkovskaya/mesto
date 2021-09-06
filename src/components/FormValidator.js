class FormValidator {

    constructor(form, validationConfig) {
        this._formElement = form
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._sectionClass = validationConfig.sectionClass;
        this._inputNotValidClass = validationConfig.inputNotValidClass;
    }

    //Показывалка ошибок
    _showInputError = (inputElement) => {
        const _formSectionElement = inputElement.closest(this._sectionClass);
        const _errorElement = _formSectionElement.querySelector(this._inputErrorClass);
        _errorElement.textContent = this._errorMassage;
        _errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputNotValidClass);
    }

    //Скрывалка ошибок
    _hideInputError = (inputElement) => {
        const _formSectionElement = inputElement.closest(this._sectionClass);
        const _errorElement = _formSectionElement.querySelector(this._inputErrorClass);
        _errorElement.textContent = "";
        _errorElement.classList.add(this._errorClass);
        inputElement.classList.remove(this._inputNotValidClass);
    }

    //Определятор запуска функции показывать или нет ошибку
    _checkInputValidity = (inputElement) => {
        this._isInputNotValid = !inputElement.validity.valid;
        if (this._isInputNotValid) {
            this._errorMassage = inputElement.validationMessage;
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    //Переключаем состояние кнопки
    _toggleButtonState() {
        const _findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
        const _hasNotValidInput = this._inputList.some(_findAtLeastOneNotValid);

        if (_hasNotValidInput) {
            this._buttonElement.setAttribute("disabled", true);
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute("disabled");
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });

    }

    enableValidation() {
        //Отменяем стандартную отправку по субмиту
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
        });

        this._setEventListeners()
    }

    _setEventListeners() {
        //Получаем все поля формы
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        //Ищем кнопку
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        //При каждом нажатии кнопки на клаве запускаем проверку ошибки
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', (event) => {
                this._checkInputValidity(inputElement);

                this._toggleButtonState(inputElement);
            })
        })
    }
}
export{FormValidator}