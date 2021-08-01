class FormValidator {

    constructor(form, selector) {
        this._formElement = form
        this._inputSelector = selector.inputSelector;
        this._submitButtonSelector = selector.submitButtonSelector;
        this._inactiveButtonClass = selector.inactiveButtonClass;
        this._inputErrorClass = selector.inputErrorClass;
        this._errorClass = selector.errorClass;
        this._sectionClass = selector.sectionClass;
        this._inputNotValidClass = selector.inputNotValidClass;
    }

    //Показывалка ошибок
    _showInputError = (_inputElement, _errorMassage, _sectionClass, _inputErrorClass, _errorClass, _inputNotValidClass) => {
        console.log(_sectionClass)
        console.log(_inputElement)
        const _formSectionElement = _inputElement.closest(_sectionClass);
        const _errorElement = _formSectionElement.querySelector(_inputErrorClass);
        _errorElement.textContent = _errorMassage;
        _errorElement.classList.add(this._errorClass);
        _inputElement.classList.add(this._inputNotValidClass);
    }

    //Скрывалка ошибок
    _hideInputError = (_inputElement, _sectionClass, _inputErrorClass, _errorClass, _inputNotValidClass) => {
        const _formSectionElement = _inputElement.closest(this._sectionClass);
        const _errorElement = _formSectionElement.querySelector(this._inputErrorClass);
        _errorElement.textContent = "";
        _errorElement.classList.add(this._errorClass);
        _inputElement.classList.remove(this._inputNotValidClass);
    }

    //Определятор запуска функции показывать или нет ошибку
    _checkInputValidity = (_inputElement, _inputNotValidClass, _sectionClass, _inputErrorClass, _errorClass) => {
        this._isInputNotValid = !_inputElement.validity.valid;

        if (this._isInputNotValid) {
            this._errorMassage = _inputElement.validationMessage;
            this._showInputError(this._inputElement, this._errorMassage, this._sectionClass, this._inputErrorClass, this._errorClass, this._inputNotValidClass);
        } else {
            this._hideInputError(this._inputElement, this._sectionClass, this._inputErrorClass, this._errorClass, this._inputNotValidClass);
        }
    }

    //Переключаем состояние кнопки
    _toggleButtonState = (_inputList, _buttonElement, _inactiveButtonClass) => {
        _findAtLeastOneNotValid = (_inputElement) => !this._inputElement.validity.valid;
        this._hasNotValidInput = inputList.some(this._findAtLeastOneNotValid);

        if (_hasNotValidInput) {
            this._buttonElement.setAttribute("disabled", true);
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute("disabled");
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    enableValidation = (_formElement, _inputSelector, _submitButtonSelector, _inactiveButtonClass, _inputErrorClass, _errorClass, _sectionClass, _inputNotValidClass) => {
        //Отменяем стандартную отправку по субмиту
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
        });

        //Получаем все поля формы
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        //Ищем кнопку
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        
        //При каждом нажатии кнопки на клаве запускаем проверку ошибки
        this._inputList.forEach(_inputElement => {
            _inputElement.addEventListener('input', (event) => {
                console.log(_inputElement)
                this._checkInputValidity(_inputElement, _inputNotValidClass, _sectionClass, _inputErrorClass, _errorClass);

                this._toggleButtonState(_inputList, _buttonElement, _inactiveButtonClass);
            })
        })
    }

}

export { FormValidator }