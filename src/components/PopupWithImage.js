import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(data) {
    const viewImage = this._popupElement.querySelector('.view-card__image');
    const viewHeading = this._popupElement.querySelector('.view-card__heading');
    viewImage.src = data.link;
    viewImage.alt = data.name;
    viewHeading.textContent = data.name;
    super.open();
  }
}