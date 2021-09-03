import { Popup } from "./Popup.js";

class PopupTrash extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._handleDelete = handleDelete;
    this._deleteCardButton = this._popupElement.querySelector('.popup__submit-btn_trash');
  }

  _setEventListeners() {
    super._setEventListeners();
    this._deleteCardButton.addEventListener('click', () => {
      this._handleDelete();
    })
  };

  open() {
    this._setEventListeners();
    super.open();
  }
}

export { PopupTrash }