import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = this._popup.querySelector('.popup__image');
    this.popupImageTitle = this._popup.querySelector('.popup__image-title');
  }

  open({ name, link }) {
    this.popupImageTitle.textContent = name;
    this.popupImage.src = link;
    this.popupImage.alt = name + ' фото';
    super.open();
  }
}
