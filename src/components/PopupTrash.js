import { Popup } from "./Popup.js";

class PopupTrash extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._handleDelete = handleDelete;
    this._deleteCardButton = this._popupElement.querySelector('.popup__submit-btn_trash');
    this._defaultTrashButtonText = this._deleteCardButton.textContent
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handleDelete(e, this._card)
    })
  };

  open(card) {
    this._card = card
    super.open();
  }
}

export { PopupTrash }