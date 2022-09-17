import { openPopup } from "./index.js";

export class Card {
  constructor(data, elementTemplate) {
    this._title = data.name;
    this._image = data.link;
    this._alt = data.name + ' фото';
    this._elementTemplate = elementTemplate;
  }

  _getTemplate() {
    return this._elementTemplate.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._alt;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__image-button').addEventListener('click', () => {
      this._handlePreviewPicture();
    });
    this._element.querySelector('.like-button').addEventListener('click', this._handleLikeIcon);
    this._element.querySelector('.delete-button').addEventListener('click', this._handleDeleteIcon);
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle('like-button_active');
  }

  _handleDeleteIcon(evt) {
    evt.target.closest('.element').remove();
  }

  _handlePreviewPicture() {
    document.querySelector('.popup__image-title').textContent = this._title;
    document.querySelector('.popup__image').src = this._image;
    document.querySelector('.popup__image').alt = this._alt;
    openPopup(document.querySelector('#popup-image'));
  }
}
