import Popup from "./Popup.js";

export default class UserInfo extends Popup {
  constructor(container, validator) {
    super(container);

    this.validator = validator;

    this._form = this.container.querySelector("form");
    this._formButton = this._form.querySelector(".popup__button");
    this._inputName = this._form.elements.name;
    this._inputJob = this._form.elements.job;
  }

  open = () => {
    super.open();

    this._form.reset();
    this._inputName.focus();

    this.validator();
    this._addEditFormListener();
  };

  _addEditFormListener = () => {
    this.container.addEventListener("submit", this._submitEditForm);
  };

  _submitEditForm = (event) => {
    event.preventDefault();
  };
  
  _removeEditFormListener = () => {
    this.container.removeEventListener("submit", this._submitEditForm);
  };

  setDefaultValue(name, about) {
    this._inputName.defaultValue = name;
    this._inputJob.defaultValue = about;
  }
}