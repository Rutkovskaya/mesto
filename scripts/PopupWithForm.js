import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector('.popup_addcard');
    this._inputList = this._form.querySelectorAll('.popup__text');
  }

  _getInputValues = () => {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitForm);
  }

  close() {
    this._form.reset();
    super.close();
  }
}

export { PopupWithForm }