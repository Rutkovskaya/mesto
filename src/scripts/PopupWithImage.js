import {Popup} from "../scripts/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._viewImage = document.querySelector('.view-card__image');
    this._viewHeading = document.querySelector('.view-card__heading');
  }


  
  open(name, link) {
    this._viewImage.src = link;
    this._viewImage.alt = name;
    this._viewHeading.textContent = name;
    super.open();
  }
}