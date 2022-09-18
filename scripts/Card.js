export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name + ' фото';
    this._elementTemplate = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return this._elementTemplate.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.like-button');
    this._deleteButton = this._element.querySelector('.delete-button');
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;

    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._likeButton.addEventListener('click', this._handleLikeIcon);
    this._deleteButton.addEventListener('click', this._handleDeleteIcon);
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle('like-button_active');
  }

  _handleDeleteIcon(evt) {
    evt.target.closest('.element').remove();
  }
}
