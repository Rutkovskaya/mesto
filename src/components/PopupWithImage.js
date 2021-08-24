import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  open(name, link) {
    const viewImage = this._popupElement.querySelector('.view-card__image');
    const viewHeading = this._popupElement.querySelector('.view-card__heading');
    viewImage.src = link;
    viewImage.alt = name;
    viewHeading.textContent = name;
    super.open();
  }
}