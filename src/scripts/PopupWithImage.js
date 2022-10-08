import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = document.querySelector('.popup__image');
    this.popupImageTitle = document.querySelector('.popup__image-title');
  }

  open({ name, link }) {
    this.popupImageTitle.textContent = name;
    this.popupImage.src = link;
    this.popupImage.alt = name + ' фото';
    super.open();
  }
}
